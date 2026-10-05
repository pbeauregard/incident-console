import { createApiServer } from "./api.js";
import { openDatabase } from "./database.js";

const database = openDatabase();
const server = createApiServer(database);
const port = Number(process.env.API_PORT ?? 3001);

server.listen(port, "0.0.0.0", () => {
  console.log(`Incident API listening on port ${port}`);
});

function shutdown() {
  server.close(() => {
    database.close();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);