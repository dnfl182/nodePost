import {Column, Entity, Index, PrimaryGeneratedColumn, Unique} from 'typeorm'
@Entity()
@Unique(["username"])
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