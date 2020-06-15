import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {sign} from 'jsonwebtoken'
import { ConfigService } from "@nestjs/config";
import { User } from 'src/entities/user.entity';
import { UserService} from 'src/user/user.service'

export enum Provider
{
    GOOGLE = 'google'
}


@Injectable()
export class AuthService {
  
    constructor(private readonly configurationService:ConfigService, private readonly usersService: UserService){ };

    async updateOauthUser(thirdPartyId:string, provider:Provider, username:string, email:string, pictureUrl:string){
        this.usersService.updateOAuthUser(provider, thirdPartyId, username, email, pictureUrl)
    }

    async validateOAuthLogin(thirdPartyId:string, provider:Provider) : Promise<string> 
    {
        try 
        {

            let userId = (await this.usersService.findOneByThirdPartyId(provider, thirdPartyId)).userId;
            
            console.log(`UserId: ${userId}`)
            
            const payload = {
                userId
            }

            const jwt: string = sign(payload, this.configurationService.get("JWT_SECRET_KEY"), { expiresIn: 3600 });
            return jwt;
        }
        catch (err)
        {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }

}