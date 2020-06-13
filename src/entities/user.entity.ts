import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    userId:number

    @Column()
    username:string;
    
    @Column()
    email:string;
    
    @Column()
    pictureUrl:string;
    
    @Column()
    firstName:string;

    @Column()
    lastName:string;
}