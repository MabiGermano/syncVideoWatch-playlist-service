import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { createRoom, findRoomByIdentifier } from "../services/RoomService";
import { User } from "../models/User";
import { v4 as uuidv4 } from "uuid";
import { Room } from "../models/Room";

export const createUser = async (req: Request, res: Response) => {
  const { nickname, room } = req.body;
  
  const userRoom = room.identifier ? 
  await findRoomByIdentifier(room.identifier) : 
  await createRoom(uuidv4());
  
  const user = new User();
  user.identifier = uuidv4();
  user.nickname = nickname;
  user.room = userRoom;

  await getRepository(User).save(user);
  console.log("User: ", user);
  
  return res.status(201).json(user);
};

export const listUsersByRoom = async (req: Request, res: Response) => {
  const {roomId} = req.params;

  const list = await getRepository(User)
  .createQueryBuilder("user")
  .innerJoin("user.room", "room")
  .where("room.identifier = :roomId", { roomId })
  .getMany();
  
  return res.status(200).json(list);
};