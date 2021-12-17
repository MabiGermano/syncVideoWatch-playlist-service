import { Request, Response } from "express";
import request from "request";
import { getRepository } from "typeorm";
import { Video } from "../models/Video";

export const createVideo = async (req: Request, res: Response) => {
  const { videoUrl, playlistId } = req.body;
  request
    .get(`https://www.youtube.com/oembed?url=${videoUrl}&format=json`)
    .on("response", function (response) {
      console.log(response.statusCode);
      console.log(response);
    });

  return res.status(201).json({ message: "Video created successfully" });
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
