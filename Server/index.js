const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");

const room = require("./src/routers/room");

const whitelist = ["http://localhost:3000"];
// Socket Import
const io = require("socket.io")(http, {
  cors: {
    origin: whitelist,
  },
});

// CORS Headers
const corsConfig = {
  credentials: true,
  origin: whitelist,
};
// port
const PORT = process.env.PORT || 8000;

app.use(cors(corsConfig));

app.use("/api/room", room);
// Socket Connection: Brodcasts Newly added data to all CONNECTED clients
const socketContainner = require("./src/controlers/socket")(io);
http.listen(PORT, console.log(`Server running on port ${PORT}`));
