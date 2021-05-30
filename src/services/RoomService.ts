import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Room } from "../models/Room"

const roomRepository = getRepository(Room)

export const createRoom = async (req: Request, res: Response) => {

    const { identifier } = req.body
    const room = { identifier }

    await roomRepository.save(room).catch((err) => {
        console.log("Error: ", err)
    })
    return res.status(201).json({ message: 'Room created successfully' })
}

export const listRoom = async (req: Request, res: Response) => {
    const list = await roomRepository.find().catch((err) => {
        console.log("Error: ", err)
    })
    return res.json(list)
}

export const deleteRoom = (req: Request, res: Response) => {
    const { id } = req.params
    roomRepository.delete(id).catch((err) => {
        console.log("Error: ", err)
    })
    return res.status(200).json({ message: 'Room deleted succesfully' })
}
