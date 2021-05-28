import { json, Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import { Room } from './models/Room'

const routes = Router()

routes.get('/', (req:Request, res:Response) => {
    return res.json({ message: 'Oiee' })
})

routes.get('/room', async (req:Request, res:Response) => {
    const roomRepository = getRepository(Room)

    const list = await roomRepository.find()
    return res.json(list)
})


routes.post('/room', async (req:Request, res:Response) => {
    const roomRepository = getRepository(Room)
    console.log(req);
    
    const { identifier } = req.body
    const room = { identifier }
    const value = await roomRepository.save(room).catch((err) => {
        console.log("Error: ", err);
      })
    return res.status(201).json(value)
})

export default routes
