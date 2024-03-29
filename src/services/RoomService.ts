import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Room } from "../models/Room";
import { initializePlaylist } from "./PlaylistService";

export const createRoom = async (identifier: string) => {
  const room = new Room();
  room.identifier = identifier;
  room.playlist = await initializePlaylist();
  await getRepository(Room)
    .save(room)
    .catch((err) => {
      console.log("Error: ", err);
    });
  return room;
};

export const findSpecificRoom = async (req:Request, res: Response) => {
  const {identifier} = req.params;
  const room =  await findRoomByIdentifier(identifier)
  return res.json(room);
};

export const findRoomByIdentifier = async (identifier: string) => {
  
  const room =  await getRepository(Room).findOneOrFail({
    where: {
      identifier: identifier,
    },
    relations: ["playlist","playlist.videos", "users"],
  });

  return room
};

export const listRoom = async (req: Request, res: Response) => {
  const list = await getRepository(Room)
    .find()
    .catch((err) => {
      console.log("Error: ", err);
    });
  return res.json(list);
};

export const deleteRoom = (req: Request, res: Response) => {
  const { id } = req.params;
  getRepository(Room)
    .delete(id)
    .catch((err) => {
      console.log("Error: ", err);
    });
  return res.status(200).json({ message: "Room deleted succesfully" });
};
