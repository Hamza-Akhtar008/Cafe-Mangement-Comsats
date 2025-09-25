import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../entities/user.entity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Hamza Akhtar', description: 'Full name of the owner' })
@IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'hamza@cafe.com', description: 'Valid email of the owner' })
 @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123', minLength: 6, description: 'Password (min 6 chars)' })
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRole, default: UserRole.OWNER })
  role: UserRole;
}
