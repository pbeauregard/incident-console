import assert from "node:assert/strict";
import { after, before, it } from "node:test";
import { createApiServer } from "./api.js";
import { openDatabase } from "./database.js";

const database = openDatabase(":memory:");
const server = createApiServer(database);
let baseUrl;

before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  database.close();
});

it("lists incidents and persists valid acknowledgement transitions", async () => {
  const listResponse = await fetch(`${baseUrl}/api/incidents`);
  const incidents = await listResponse.json();
  assert.equal(listResponse.status, 200);
  assert.equal(incidents.length, 31);
  assert.equal(incidents[0].id, "INC-101");

  const updateResponse = await fetch(
    `${baseUrl}/api/incidents/INC-101/acknowledge`,
    { method: "PATCH" },
  );
  assert.equal(updateResponse.status, 200);
  assert.equal((await updateResponse.json()).status, "Acknowledged");

  const updatedList = await fetch(`${baseUrl}/api/incidents`).then((response) => response.json());
  assert.equal(updatedList[0].status, "Acknowledged");

  const repeatedUpdate = await fetch(
    `${baseUrl}/api/incidents/INC-101/acknowledge`,
    { method: "PATCH" },
  );
  assert.equal(repeatedUpdate.status, 409);

  const unknownIncident = await fetch(
    `${baseUrl}/api/incidents/INC-999/acknowledge`,
    { method: "PATCH" },
  );
  assert.equal(unknownIncident.status, 404);
});