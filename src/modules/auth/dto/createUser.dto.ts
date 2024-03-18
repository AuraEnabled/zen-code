import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Username', nullable: false })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email', nullable: false })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Password', nullable: false })
  readonly password: string;
}
