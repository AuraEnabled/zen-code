import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email', nullable: false })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Password', nullable: false })
  readonly password: string;
}
