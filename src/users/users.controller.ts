import { Controller, Post, Body, Get, Query, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/guard/public.decorator';




@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
@Public()
    @Post('owner')
  @ApiCreatedResponse({ type: User })
@ApiBody({ type: CreateUserDto })
  async createOwner(@Body() dto: CreateUserDto) {
    try {
      return await this.usersService.createOwner(dto.name, dto.email, dto.password);
    } catch (e) {
      if (e.message.includes('Email already in use')) {
        throw new ConflictException('Email already in use');
      }
      throw e;
    }
  }

  @Post('manager')
  @ApiCreatedResponse({ type: User })
  @ApiBody({ type: CreateUserDto })
  async createManager(@Body() dto: CreateUserDto) {
    return this.usersService.createManager(dto.name, dto.email, dto.password);
  }

  @Get('find-by-email')
  @ApiOkResponse({ type: User })
  async findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
