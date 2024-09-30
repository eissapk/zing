import { rooms } from "..";
import jwt from "jsonwebtoken";
const { JWT_SECRET, JWT_EXPIRATION } = process.env;

export const createToken = (_id: string) => {
	return jwt.sign({ _id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const expiresIn = (period: number) => {
	return new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * period);
};

export const slugify = (str: string) => {
	return str
		.replace(/[&\\/\\#,+()$~%.'":*?<>{}]/g, "")
		.split(" ")
		.join("-")
		.toLowerCase(); // todo: test arabic chars with تشكيل
};

export const randomKey = () => Math.random().toString(36).slice(2);

// TODO: try to understand this part better
export function getUserRooms(socket) {
	return Object.entries(rooms).reduce((names, [name, room]) => {
		// @ts-expect-error -- tandle it later
		if (room.users[socket.id]) names.push(name);
		return names;
	}, []);
}
