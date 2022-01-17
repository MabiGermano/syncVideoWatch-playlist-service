import { Request, Response } from "express";
import request from "request";
import axios from "axios"
import { getRepository } from "typeorm";
import { Room } from "../models/Room";
import { Video } from "../models/Video";
import { findRoomByIdentifier } from "./RoomService";

export const addNewVideoToPlaylist = async (req: Request, res: Response) => {
  const { videoUrl } = req.body;
  const { roomIdentifier } = req.params;
  const room = await findRoomByIdentifier(roomIdentifier);
  const video = new Video();
  const videoCode = videoUrl.match(/([A-Z])\w+/g)[0];

  request.get(
    {
      url: `https://www.youtube.com/oembed?url=${videoUrl}&format=json`,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (_, __, data) => buildAndSaveVideo(data, videoCode, room)
  );
};

const buildAndSaveVideo = (dataResponse:any, videoCode:string, room:Room) => {
  const video = new Video();
  video.title = dataResponse.title;
  video.thumbnailImage = dataResponse.thumbnail_url;
  video.authorName = dataResponse.author_name;
  video.videoCode = videoCode;
  room.playlist.videos.push(video);
  video.playlist = room.playlist;
  getRepository(Video).save(video);

  request.post({
    url: "http://127.0.0.1:3333/notify/new-video",
    json: true,
    headers: { "User-Agent": "request" },
    body: {room}
  })
};

export const listVideos = async (req: Request, res: Response) => {
  const list = await getRepository(Video)
    .find()
    .catch((err) => {
      console.log("Error: ", err);
    });
  return res.json(list);
};

export const deleteVideo = (req: Request, res: Response) => {
  const { id } = req.params;
  getRepository(Video)
    .delete(id)
    .catch((err) => {
      console.log("Error: ", err);
    });
  return res.status(200).json({ message: "Video deleted succesfully" });
};
