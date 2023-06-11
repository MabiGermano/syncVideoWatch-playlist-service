import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm'
import { Video } from "./Video"

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    id:number

    @OneToMany(() => Video, video => video.playlist)
    videos:Video[]

    @Column()
    currentPlaying:string
}