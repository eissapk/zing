import { rooms } from "..";
import { getUserRooms } from ".";
export const socket = socket => {
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
};
