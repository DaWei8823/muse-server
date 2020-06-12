import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    
    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin()
    {

    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res)
    {
        console.log(req.user);
        const jwt: string = req.user.jwt;
        if (jwt)
            res.redirect('http://localhost:4200/login/succes/' + jwt);
        else 
            res.redirect('http://localhost:4200/login/failure');
    }

}
