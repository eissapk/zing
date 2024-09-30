import express from "express";
import { createRoom, getRooms } from "../controllers/room";
// import auth from "../middleware/auth";

const router = express.Router();

// router.use(auth); // protect below routes

router.get("/rooms", getRooms);
router.post("/room", createRoom);

export default router;
