import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../entities/user.entity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDTO {

  @ApiProperty({ example: 'hamza@cafe.com', description: 'Valid email of the owner' })
 @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123', minLength: 6, description: 'Password (min 6 chars)' })
  @IsNotEmpty()
  password: string;

  
}
