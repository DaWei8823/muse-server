import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { OathLogin } from 'src/entities/oath-login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,OathLogin])],
  providers: [UserService],
  exports: [TypeOrmModule]
})
export class UserModule {}