import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Account } from './account';
@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        length: 100
    })
    title: string;
    @Column({
        length: 3000
    })
    content: string;
    
    @ManyToOne(type => Account, account => account.id)
    account: number;
}