import { rooms } from "../index";
import { io } from "../index";

export const getRooms = (req, res) => {
	res.status(200).json({ success: true, rooms });
};

// TODO: add max number of rooms
export const createRoom = (req, res) => {
	const { room } = req.body;
	if (rooms[room]) return res.redirect("/room/" + room);

	rooms[req.body.room] = { users: {} };
	// send msg to new room created
	io.emit("room-created", room);
	res.redirect("/room/" + room);
};
