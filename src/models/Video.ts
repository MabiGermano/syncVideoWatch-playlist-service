import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Playlist } from "./Playlist"

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    authorName:string

    @Column()
    thumbnailImage:string

    @Column()
    videoCode:string

    @ManyToOne(() => Playlist, playlist => playlist.videos)
    playlist:Playlist
}