import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository, Entity } from 'typeorm';
import { Provider } from 'src/auth/auth.service';
import { OathLogin } from 'src/entities/oath-login.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepo: Repository<User>,
        @InjectRepository(OathLogin)
        private readonly oathRepo : Repository<OathLogin>
        ) 
        {}
    
    async findOneByThirdPartyId(provider:Provider, thirdPartyId:string): Promise<User>{
        let oath = await this.oathRepo.findOne({ where: { provider : provider, thirdPartyId : thirdPartyId}});
        console.log('oath')
        console.log(oath)
        
        return oath?.user
    }

    registerOAuthUser(provider:Provider,thirdPartyId:string): Promise<User> {
        let user : User = new User()
        this.userRepo.insert(user);
        
        let userId = user.userId;
        
        console.log(`UserId NEW: ${userId}`)

        let login : OathLogin = 
        { 
            thirdPartyId: thirdPartyId, 
            provider: provider, 
            user : user 
        };

        this.oathRepo.insert(login);
        
        return this.findOneByThirdPartyId(provider, thirdPartyId);
    }

}
