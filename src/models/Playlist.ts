import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { Room } from "./Room"
import { Video } from "./Video"

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    id:number

    @OneToOne(() => Room)
    @JoinColumn()
    room:Room

    @OneToMany(() => Video, video => video.playlist)
    videos:Video[]
}