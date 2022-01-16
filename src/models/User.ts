import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Room } from './Room'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    identifier: string

    @Column()
    nickname: string

    @Column()
    roomAdmin:boolean = false

    @ManyToOne(() => Room, room => room.users)
    room: Room
}