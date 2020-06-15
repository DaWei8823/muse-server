import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository, SaveOptions } from 'typeorm';
import { Provider } from 'src/auth/auth.service';
import { OauthLogin } from 'src/entities/oauth-login.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) 
        private readonly userRepo: Repository<User>,
        @InjectRepository(OauthLogin)
        private readonly oathRepo : Repository<OauthLogin>
        ) {}
    
    async findOneByThirdPartyId(provider:Provider, thirdPartyId:string): Promise<User>{
        let oath = await this.oathRepo
            .findOne(
                { 
                    where: { 
                        provider : provider, 
                        thirdPartyId : thirdPartyId
                    }
                });

        return oath?.user
    }

    async findOneByUserId(userId:number): Promise<User>{
        return await this.userRepo.findOne(userId);
    }

    async updateOAuthUser(provider:Provider, thirdPartyId:string, username:string, email:string, pictureUrl?:string) {

        let user : User = { 
            username:username, 
            email:email, 
            pictureUrl: pictureUrl, 
            userId: (await this.findOneByThirdPartyId(provider, thirdPartyId))?.userId 
        }

        let login : OauthLogin = 
        { 
            thirdPartyId: thirdPartyId, 
            provider: provider, 
            user : user 
        };
        
         this.oathRepo.save(login);  
    }
}