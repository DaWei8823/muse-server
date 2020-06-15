import { Entity, PrimaryGeneratedColumn, Column, OneToOne, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { type } from 'os'
import { User } from './user.entity'

@Entity()
export class OauthLogin{
    @PrimaryColumn()
    thirdPartyId:string;
    @PrimaryColumn()
    provider:string;
 
    @ManyToOne(type => User, { eager:true, cascade: true})
    @JoinColumn({ name: "userId" , referencedColumnName: "userId" })
    user:User;
}