import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity';
import { OauthLogin } from './entities/oauth-login.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot({isGlobal: true,}),
    TypeOrmModule.forRoot({
      type : 'sqlite',
      database: 'muse.db',
      entities: [User, OauthLogin],
      synchronize: true
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
