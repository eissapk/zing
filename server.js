const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors()); // for using the api from anywhere
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "./public")));

const users = {};
// socket.broadcast: sends to all connected users except the sender
io.on("connection", (socket) => {
  // runs when a new user connects
  console.log("user connected", socket.id);

  socket.on("new-user", (name) => {
    console.log("user", name, socket.id);
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("send-chat-message", (message) => {
    console.log(message);
    socket.broadcast.emit("chat-message", { message, name: users[socket.id] });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(PORT, () => console.log("server started on port ", PORT));
