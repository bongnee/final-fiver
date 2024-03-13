import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment/environment.service';
import { Role } from 'src/domain/enums/role.enum';
@Injectable()
export class UserMiddleware implements NestMiddleware {
   constructor(private readonly config: EnvironmentConfigService) {
   }
   use(req: Request, res: Response, next: NextFunction) {
      const token = req.headers.authorization;
      const idUser = Number(req.params.id)
      const bearerPrefix = 'Bearer ';
      let newToken = ""
      if (token && token.startsWith(bearerPrefix)) {
         newToken = token.substring(bearerPrefix.length);
      }
      if (idUser) {
         try {
            const decodedToken: any = jwt.verify(newToken, this.config.getJwtSecret())
            const { id, role } = decodedToken.data
            if (role === Role.Admin) {
               next();
            } else {
               if (role === Role.User && id === idUser) {
                  next();
               }
               else {
                  return res.status(403).json({ message: 'Bạn không có quyền thao tác với tài khoản của người khác' });
               }
            }
         } catch (error) {
            return res.status(403).json({ message: 'Token không hợp lệ' });
         }
      } else {
         return next()
      }
   }
}
