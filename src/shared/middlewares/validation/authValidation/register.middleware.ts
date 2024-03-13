import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthRegisterDto } from 'src/infrastructure/auth/auth.dto';

@Injectable()
export class RegisterMiddleware implements NestMiddleware {
   async use(request: Request, response: Response, next: NextFunction) {
      const authRegisterDto = plainToClass(AuthRegisterDto, request.body)
      const validateRegister = await validate(authRegisterDto)
      if (validateRegister.length > 0) {
         return response.send(validateRegister)
      } else {
         next()
      }
   }
}