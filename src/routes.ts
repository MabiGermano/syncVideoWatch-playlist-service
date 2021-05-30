import { Request, Response, Router } from 'express'
import { createRoom, deleteRoom, listRoom } from './services/RoomService'

const routes = Router()

routes.get('/', (req:Request, res:Response) => {
    return res.json({ message: 'Oiee' })
})

// Room's actions
routes.get('/room', listRoom)
routes.post('/room', createRoom)
routes.delete('/room/:id', deleteRoom)

export default routes
