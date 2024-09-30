import "dotenv/config";
// const { NODE_ENV, PORT, IO_PORT, EXPRESS_LIMIT, DOMAIN }: any = process.env;
const { PORT, IO_PORT, EXPRESS_LIMIT }: any = process.env;

import express from "express";
import cors from "cors";
// import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
// routes
import room from "./routes/room";
// import { socket } from "./utils/socket";
import { getUserRooms } from "./utils";

const app = express();
const server = http.createServer(app);
export const io = new Server(server);
io.listen(IO_PORT); // this is a must if backend & frontend are separated

// const isDev = NODE_ENV == "dev";
export const rooms = {};

// middleware
app.use(express.json({ limit: EXPRESS_LIMIT }));
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan("tiny"));
// app.use(cors({ origin: isDev ? "http://localhost:" + IO_PORT : DOMAIN, credentials: true }));
app.use(cors());

// routes
// app.use(require("./routes").Router);
app.use("/api", room);

// socket.broadcast: sends to all connected users except the sender
// Hint: socket.join() and socket.to() handles requests to specific unique id like room (so it's a built-in functionality in socket.io)
// TODO: study join() and to()
io.on("connection", socket => {
	// runs when a new user connects
	console.log("user connected", socket.id);

	socket.on("new-user", (room, name) => {
		socket.join(room);
		console.log("user", room, name, socket.id);
		rooms[room].users[socket.id] = name;
		socket.broadcast.to(room).emit("user-connected", name);
	});

	socket.on("send-chat-message", (room, message) => {
		console.log(message);
		socket.broadcast.to(room).emit("chat-message", { message, name: rooms[room].users[socket.id] });
	});

	socket.on("disconnect", () => {
		getUserRooms(socket).forEach(room => {
			// @ts-expect-error -- tandle it later
			socket.broadcast.to(room).emit("user-disconnected", rooms[room].users[socket.id]);
			// @ts-expect-error -- tandle it later
			delete rooms[room].users[socket.id];
		});
	});
});

// init server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
