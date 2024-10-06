import { rooms } from "..";
import { getUserRooms } from ".";
// socket.broadcast: sends to all connected users except the sender
// Hint: socket.join() and socket.to() handles requests to specific unique id like room (so it's a built-in functionality in socket.io)
// TODO: study join() and to()
export const socket = socket => {
	// runs when a new user connects
	console.log("User:", socket.id, "Connected");

	socket.on("new-user", (room, name) => {
		socket.join(room);
		console.log(`User: ${name}(${socket.id}) -- Joined room: ${room}`);

		rooms[room].users[socket.id] = name;
		socket.broadcast.to(room).emit("user-connected", name);
	});

	socket.on("send-chat-message", (room, message) => {
		const name = rooms[room].users[socket.id];
		console.log(`User: ${name}(${socket.id}) -- Sent "${message}" -- To room: ${room}`);
		socket.broadcast.to(room).emit("chat-message", { message, name });
	});

	socket.on("disconnect", () => {
		getUserRooms(socket).forEach(room => {
			// @ts-expect-error -- tandle it later
			socket.broadcast.to(room).emit("user-disconnected", rooms[room].users[socket.id]);
			// @ts-expect-error -- tandle it later
			console.log(`User: ${rooms[room].users[socket.id]} -- Left room: ${room}`);
			// @ts-expect-error -- tandle it later
			delete rooms[room].users[socket.id];
		});
	});
};
