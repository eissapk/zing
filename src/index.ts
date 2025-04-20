import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

import room from "./routes/room";
import { socket } from "./utils/socket";

const { NODE_ENV, PORT = 4000, EXPRESS_LIMIT, DOMAIN, DOMAIN_DEV } = process.env;

const isDev = NODE_ENV === "dev";
const corsConfig = {
	origin: isDev ? DOMAIN_DEV : DOMAIN,
	methods: ["GET", "POST"],
	credentials: true,
};

const app = express();
const server = http.createServer(app);

// Attach Socket.IO to the same server
export const io = new Server(server, { cors: corsConfig });
export const rooms = {};

// Middleware
app.use(express.json({ limit: EXPRESS_LIMIT }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors(corsConfig));

// Routes
app.use("/api", room);

// Socket.io events
io.on("connection", socket);

// Start server (for both Express and Socket.IO)
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
