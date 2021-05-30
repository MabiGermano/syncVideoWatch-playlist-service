import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Room } from '../models/Room'
import { User } from '../models/User'

// study this
// const roomRepository = getRepository(Room)
// const userRepository = getRepository(User)

export const createUser = async (req: Request, res: Response) => {
    const { nickname, roomIdentifier } = req.body

    const room = await getRepository(Room).findOneOrFail({ identifier: roomIdentifier })
    const user = {
        nickname,
        room
    }
    await getRepository(User).save(user)
    return res.status(201).json({message: 'User created successfully'})
}