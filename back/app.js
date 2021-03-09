const express = require("express");
const app = express();
const port = process.env.port ?? 5500;
const path = require("path");
const router = require("./router/routes");
const rootPath = path.resolve();

app.use(express.static(rootPath));
app.use("/todo", router);

app.listen(port, console.log(`server up===>>>>>localhost:${port} `));
