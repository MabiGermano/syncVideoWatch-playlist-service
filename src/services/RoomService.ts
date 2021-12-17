import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Room } from "../models/Room";
import { User } from "../models/User";

export const createRoom = async (identifier: string) => {
  const room = { identifier };

  const createdRoom = getRepository(Room).create(room);
  await getRepository(Room)
    .save(room)
    .catch((err) => {
      console.log("Error: ", err);
    });
  return createdRoom;
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
