import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 👈 important
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // 👈 so AuthModule can use it later
})
export class UsersModule {}
