import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
@Entity()
export class Account{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        length: 100
    })
    username: string;
    @Column({
        length: 128
    })
    password: string;
}