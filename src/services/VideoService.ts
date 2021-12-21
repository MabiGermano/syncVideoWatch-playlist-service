import { Request, Response } from "express";
import request from "request";
import { getRepository } from "typeorm";
import { Video } from "../models/Video";
import { findRoomByIdentifier } from "./RoomService";

export const addNewVideoToPlaylist = async (req: Request, res: Response) => {
  const { videoUrl } = req.body;
  const { roomIdentifier } = req.params;
  const room = await findRoomByIdentifier(roomIdentifier);
  const video = new Video();
  const videoCode = videoUrl.match(/([A-Z])\w+/g)[0] 

  console.log("room", room);
  
 request.get({
    url:  `https://www.youtube.com/oembed?url=${videoUrl}&format=json`,
    json: true,
    headers: {'User-Agent': 'request'}
  }, async function(error, response, data) {
    
    video.title = data.title;
    video.thumbnailImage = data.thumbnail_url;
    video.authorName = data.author_name;
    video.videoCode = videoCode;
    video.playlist = room.playlist
    await getRepository(Video).save(video)
    
    return res.status(201).json(video);
  })};

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
