import { Request, Response, Router } from 'express'
import { deleteRoom, listRoom } from './services/RoomService'
import { createUser, listUsersByRoom } from './services/UserService'
import { addNewVideoToPlaylist } from './services/VideoService'

const routes = Router()

routes.get('/', (req:Request, res:Response) => {
    return res.json({ message: 'Oiee' })
})

// Room's actions
routes.get('/room', listRoom)
routes.delete('/room/:id', deleteRoom)

// User's actions
routes.post('/user', createUser)
routes.get('/users/:roomId', listUsersByRoom)


// Video's actions
routes.post('/video/:roomIdentifier', addNewVideoToPlaylist)



export default routes
