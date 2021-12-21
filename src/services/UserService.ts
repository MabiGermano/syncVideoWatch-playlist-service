import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { createRoom } from "../services/RoomService";
import { User } from "../models/User";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (req: Request, res: Response) => {
  const { nickname } = req.body;
  
  const room = await createRoom(uuidv4());
  const user = new User();
  user.nickname = nickname;
  user.room = room;

  await getRepository(User).save(user);
  console.log("User: ", user);
  
  return res.status(201).json(room.playlist.videos);
};
