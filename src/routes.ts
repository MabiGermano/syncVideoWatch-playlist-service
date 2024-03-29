import { Request, Response, Router } from 'express'
import { nextVideo, previousVideo, updatePlaylist } from './services/PlaylistService'
import { deleteRoom, findRoomByIdentifier, findSpecificRoom, listRoom } from './services/RoomService'
import { createUser, listUsersByRoom } from './services/UserService'
import { addNewVideoToPlaylist } from './services/VideoService'

const routes = Router()

// Room's actions
routes.get('/room', listRoom)
routes.delete('/room/:id', deleteRoom)
routes.get('/room/:identifier', findSpecificRoom)

// User's actions
routes.post('/user', createUser)
routes.get('/users/:roomId', listUsersByRoom)


// Video's actions
routes.post('/video/:roomIdentifier', addNewVideoToPlaylist)

routes.get('/:roomId/playlist/next-video', nextVideo)
routes.get('/:roomId/playlist/previous-video', previousVideo)
routes.put('/:roomId/playlist/', updatePlaylist)

export default routes
