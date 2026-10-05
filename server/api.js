import { createServer } from "node:http";
import {
  acknowledgeIncident,
  IncidentNotFoundError,
  IncidentStateError,
  listIncidents,
} from "./database.js";

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(body));
}

export function createApiServer(database) {
  return createServer((request, response) => {
    const url = new URL(request.url ?? "/", "http://localhost");

    if (request.method === "GET" && url.pathname === "/api/incidents") {
      sendJson(response, 200, listIncidents(database));
      return;
    }

    const match = url.pathname.match(/^\/api\/incidents\/([^/]+)\/acknowledge$/);
    if (request.method === "PATCH" && match) {
      let id;
      try {
        id = decodeURIComponent(match[1]);
      } catch {
        sendJson(response, 400, { error: "Invalid incident id" });
        return;
      }

      try {
        sendJson(response, 200, acknowledgeIncident(database, id));
      } catch (error) {
        if (error instanceof IncidentNotFoundError) {
          sendJson(response, 404, { error: error.message });
        } else if (error instanceof IncidentStateError) {
          sendJson(response, 409, { error: error.message });
        } else {
          console.error("Incident API error:", error);
          sendJson(response, 500, { error: "Internal server error" });
        }
      }
      return;
    }

    sendJson(response, 404, { error: "Route not found" });
  });
}