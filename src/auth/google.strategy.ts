import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { AuthService, Provider } from "./auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    
    constructor(
        private readonly configService:ConfigService, 
        private readonly authService:AuthService
        )
    {
        super({
            clientID    : configService.get('GOOG_CLIENT_ID'),
            clientSecret: configService.get('GOOG_CLIENT_SECRET'),
            callbackURL : 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile', 'email']
        })
    }


    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        try
        {
            console.log("UPDATING OAUTH USER")       
            
            await this.authService.updateOauthUser(profile.id, Provider.GOOGLE, profile._json.name, profile._json.email_verified ?  profile._json.email : null , profile._json.picture);

            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE)
            const user = 
            {
                jwt
            }

            done(null, user);
        }
        catch(err)
        {
            done(err, false);
        }
    }

}