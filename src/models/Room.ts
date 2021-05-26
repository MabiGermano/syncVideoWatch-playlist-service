import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { User } from './User'

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    identifier: string

    @OneToMany(() => User, user => user.room)
    users: User[]
}