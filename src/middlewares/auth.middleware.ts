import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { ConfigService } from '@nestjs/config';
import { EnhancedRequestInterface } from '../types/enhancedRequest.interface';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: EnhancedRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.headers.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split('Bearer ')[1];

    try {
      const decode = verify(token, this.configService.get('JWT_SECRET'));
      req.user = await this.userService.getUserById(decode.id);
      next();
    } catch (err) {
      req.user = null;
      next();
    }

    return;
  }
}
