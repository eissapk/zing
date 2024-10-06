import "dotenv/config";
const { NODE_ENV, PORT = 4000, IO_PORT = 4001, EXPRESS_LIMIT, DOMAIN, DOMAIN_DEV }: any = process.env;
import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
// routes
import room from "./routes/room";
import { socket } from "./utils/socket";

const isDev = NODE_ENV == "dev";
const corsConfig = { origin: isDev ? DOMAIN_DEV : DOMAIN, methods: ["GET", "POST"], credentials: true };
const app = express();
const server = http.createServer(app);
export const io = new Server(server, { cors: corsConfig });
io.listen(IO_PORT); // this is a must if backend & frontend are separated

export const rooms = {};

// middleware
app.use(express.json({ limit: EXPRESS_LIMIT }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors(corsConfig));

// routes
// app.use(require("./routes").Router);
app.use("/api", room);

io.on("connection", socket);

// init server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
