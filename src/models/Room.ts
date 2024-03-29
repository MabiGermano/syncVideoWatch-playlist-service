import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { Playlist } from './Playlist'
import { User } from './User'

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    identifier: string

    @OneToOne(() => Playlist)
    @JoinColumn()
    playlist:Playlist

    @OneToMany(() => User, user => user.room)
    users: User[]

}