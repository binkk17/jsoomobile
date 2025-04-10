const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
    // Create json-server instance
    const server = jsonServer.create();
    const middlewares = jsonServer.defaults();
    const filePath = path.resolve(__dirname, "db/db.json"); // Use __dirname for reliable path
    const data = fs.readFileSync(filePath, "utf-8");
    const db = JSON.parse(data);
    const router = jsonServer.router(db);

    // Apply middlewares and rewrites
    server.use(middlewares);
    server.use(
        jsonServer.rewriter({
            "/api/*": "/$1",
        })
    );
    server.use(router);

    // Handle the request
    server(req, res);
};