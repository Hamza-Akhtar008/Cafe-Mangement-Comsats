import { Controller, Post, Body, Get, Query, ConflictException, Delete, Param, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBody, ApiNotFoundResponse } from '@nestjs/swagger';
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

 @Get('managers')
  @ApiOkResponse({ type: User })
  async getallmanagers( ) {
    return this.usersService.getAllManagers();
  }


   @Delete(':id')
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteUser(@Param('id') id: string) {
        const userId = parseInt(id, 10);
    if (isNaN(userId)) {
        throw new BadRequestException('Invalid ID');
    }
    // Call the service method to delete the user by ID
    const deletedUser = await this.usersService.deleteUserById(userId);

    if (!deletedUser) {
      // If the user was not found, return a 404 error with a message
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // If user is deleted, return a success message with HTTP 200 OK
    return { message: 'User deleted successfully' };
  }

}
