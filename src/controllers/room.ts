import { rooms } from "../index";
import { io } from "../index";

export const getRooms = (req, res) => {
	res.status(200).json({ success: true, rooms });
};

export const getRoomUsers = (req, res) => {
	const { room } = req.params;
	if (!room) return res.status(200).json({ success: true, message: "room param is not present!" });
	res.status(200).json({ success: true, users: rooms[room].users });
};

// TODO: add max number of rooms
export const createRoom = (req, res) => {
	const { room } = req.body;
	if (rooms[room]) return res.redirect("/room/" + room);

	rooms[req.body.room] = { users: {} };
	// send msg to new room created
	io.emit("room-created", room);
	res.status(200).json({success: true, message: `Room(${room}) created!`})
	// res.redirect("/room/" + room);
	console.log(`Room(${room}) created!`);
};
