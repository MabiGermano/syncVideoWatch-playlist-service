import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Playlist } from "../models/Playlist";
import { Room } from "../models/Room";
import { findRoomByIdentifier } from "./RoomService";

export const initializePlaylist = async () => {
  const playlist = new Playlist();
  playlist.videos = new Array();
  playlist.currentPlaying = "";
  await getRepository(Playlist)
    .save(playlist)
    .catch((err) => {
      console.log("Error: ", err);
    });
  console.log("Inicializando playlist");

  return playlist;
};

const findByRoomIdentifier = async (roomIdentifier) => {
  let playlist = await getRepository(Playlist).findOneOrFail({
    relations: ["room"],
    where: {
      room: {
        identifier: roomIdentifier,
      },
    },
  });
  return playlist;
};

export const nextVideo = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const room = await findRoomByIdentifier(roomId);
  const {playlist} = room;
  let playingIndex = findVideoIndex(playlist.currentPlaying, playlist);

  if (playlist.videos.length > playingIndex + 1)
    playlist.currentPlaying = playlist.videos[playingIndex+1].videoCode;
  
  await getRepository(Playlist).save(playlist);
  return res.json({playlist});
};

export const previousVideo = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const room = await findRoomByIdentifier(roomId);
  const { playlist } = room;
  let playingIndex = findVideoIndex(playlist.currentPlaying, playlist);

  if (playlist.videos.length > 0)
    playlist.currentPlaying = playlist.videos[playingIndex-1].videoCode;

  await getRepository(Playlist).save(playlist);
  return res.json({playlist});
};

export const updatePlaylist = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const {clientPlaylist} = req.body;

  const room = await findRoomByIdentifier(roomId);
  const { playlist } = room;
  playlist.currentPlaying = clientPlaylist.currentPlaying;

  await getRepository(Playlist).save(playlist);
  return res.json({playlist});
};

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

const findVideoIndex = (videoCode:string, playlist:Playlist) => {

  return playlist.videos.findIndex(
    (video) => video.videoCode === videoCode
  );
}
