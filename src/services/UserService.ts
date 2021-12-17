import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { createRoom } from '../services/RoomService'
import { User } from '../models/User'
import { v4 as uuidv4 } from 'uuid';
import { createPlaylist } from './PlaylistService';

export const createUser = async (req: Request, res: Response) => {
    const { nickname } = req.body
    const user = {
        nickname
    }
    const createdUser = getRepository(User).create(user)
    // await getRepository(User).save(user)

    const room = await createRoom(uuidv4())
    createdUser.room = room
    await getRepository(User).save(createdUser)
    
    const playlist = createPlaylist(room)
    
    return res.status(201).json({playlist, room})
}