import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { initialIncidents } from "../src/data/incidents.ts";

export class IncidentNotFoundError extends Error {}
export class IncidentStateError extends Error {}

export function openDatabase(
  filePath = process.env.DATABASE_PATH ?? resolve("server/data/incidents.sqlite"),
) {
  if (filePath !== ":memory:") mkdirSync(dirname(filePath), { recursive: true });

  const database = new DatabaseSync(filePath);
  database.exec(`
    CREATE TABLE IF NOT EXISTS incidents (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('Alarm', 'Door activity', 'Camera event')),
      status TEXT NOT NULL CHECK (status IN ('Active', 'Acknowledged', 'Resolved')),
      location TEXT NOT NULL,
      time TEXT NOT NULL,
      description TEXT NOT NULL,
      display_order INTEGER NOT NULL
    )
  `);

  const insert = database.prepare(`
    INSERT OR IGNORE INTO incidents (id, title, type, status, location, time, description, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  database.exec("BEGIN IMMEDIATE");
  try {
    initialIncidents.forEach((incident, index) => {
      insert.run(
        incident.id,
        incident.title,
        incident.type,
        incident.status,
        incident.location,
        incident.time,
        incident.description,
        index,
      );
    });
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }

  return database;
}

export function listIncidents(database) {
  return database
    .prepare(
      "SELECT id, title, type, status, location, time, description FROM incidents ORDER BY display_order",
    )
    .all();
}

export function acknowledgeIncident(database, id) {
  const incident = database
    .prepare("SELECT id, title, type, status, location, time, description FROM incidents WHERE id = ?")
    .get(id);
  if (!incident) throw new IncidentNotFoundError(`Incident ${id} was not found`);
  if (incident.status !== "Active") {
    throw new IncidentStateError("Only active incidents can be acknowledged");
  }

  database
    .prepare("UPDATE incidents SET status = 'Acknowledged' WHERE id = ?")
    .run(id);
  return { ...incident, status: "Acknowledged" };
}