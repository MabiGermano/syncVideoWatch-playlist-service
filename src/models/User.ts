import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Room } from './Room'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nickname: string

    @ManyToOne(type => Room, room => room.users)
    room: Room
}