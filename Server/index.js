const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");

const PORT = process.env.PORT || 8000;

//
console.log(path.join(__dirname, "../Client/build"));
app.use(express.static(path.join(__dirname, "../Client/build"))); // path.resolve was missing here
app.get("/*", (req, res) => res.sendFile(path.join(__dirname, "../Client/build", "index.html")));

http.listen(PORT, console.log(`Server running on port ${PORT}`));
