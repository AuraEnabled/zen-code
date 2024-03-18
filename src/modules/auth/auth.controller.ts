import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserResponseInterface } from './types/userResponse.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Register new user in the system & receive JWT' })
  async signUp(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    return await this.authService.signUpUser(createUserDto);
  }

  @Post('signIn')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'Login user & receive JWT' })
  async signIn(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    return this.authService.signInUser(loginUserDto);
  }
}
