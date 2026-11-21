
const http = require("http");
require("./db");

const signup = require("./auth");
const login = require("./login");

const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    const path = new URL(req.url, "http://localhost").pathname;

    if (path === "/api/health" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        return res.end(JSON.stringify({
            message: "Code Quest backend is working!"
        }));
    }

    if (path === "/api/signup" && req.method === "POST") {
        return signup(req, res);
    }

    if (path === "/api/login" && req.method === "POST") {
        return login(req, res);
    }

    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        message: "Route not found"
    }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
    console.log("Code Quest server running on port " + PORT);
});
