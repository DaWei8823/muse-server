import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { OauthLogin } from 'src/entities/oauth-login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,OauthLogin])],
  providers: [UserService],
  exports: [TypeOrmModule]
})
export class UserModule {}