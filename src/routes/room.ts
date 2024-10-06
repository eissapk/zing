import express from "express";
import { createRoom, getRooms, getRoomUsers } from "../controllers/room";
// import auth from "../middleware/auth";

const router = express.Router();

// router.use(auth); // protect below routes

router.get("/rooms", getRooms);
router.get("/room/:room/users", getRoomUsers);
router.post("/room", createRoom);

export default router;
