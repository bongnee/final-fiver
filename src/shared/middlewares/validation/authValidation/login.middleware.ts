import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthLoginDto } from 'src/infrastructure/auth/auth.dto';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
   async use(request: Request, response: Response, next: NextFunction) {
      const authLoginDto = plainToClass(AuthLoginDto, request.body)
      const validateLogin = await validate(authLoginDto)
      if (validateLogin.length > 0) {
         const { value, constraints } = validateLogin[0]
         let error = {
            value,
            constraints,
         }
         response.send(error)
      } else {
         next()
      }
   }
}