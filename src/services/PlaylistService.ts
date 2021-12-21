import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Playlist } from "../models/Playlist";
import { Room } from "../models/Room";
import { findRoomByIdentifier } from "./RoomService";

export const initializePlaylist = async () => {
  const playlist = new Playlist();
  playlist.videos = new Array();
  await getRepository(Playlist)
    .save(playlist)
    .catch((err) => {
      console.log("Error: ", err);
    });
  console.log("Inicializando playlist");

  return playlist;
};

// export const findPlaylistByRoom = async (req: Request, res: Response) => {
//   const { roomIdentifier } = req.params;
//   const room = await findRoomByIdentifier(roomIdentifier);

//   return res.json(await getRepository(Playlist).findOneOrFail({ room }));
// };

export const listPlaylists = async (req: Request, res: Response) => {
  const list = await getRepository(Playlist)
    .find()
    .catch((err) => {
      console.log("Error: ", err);
    });
  return res.json(list);
};

export const deletePlaylist = (req: Request, res: Response) => {
  const { id } = req.params;
  getRepository(Playlist)
    .delete(id)
    .catch((err) => {
      console.log("Error: ", err);
    });
  return res.status(200).json({ message: "Playlist deleted succesfully" });
};
