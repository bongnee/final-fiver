import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUtils {
   constructor() {

   }
   public getTokenFromRequest(req: Request): string {
      const token = req.headers.authorization;
      const bearerPrefix = 'Bearer ';
      if (token && token.startsWith(bearerPrefix)) {
         return token.substring(bearerPrefix.length);
      }
      return null;
   }

   public getDecodedToken(token: string, jwtSecret: string): any {
      try {
         const decodedToken: any = jwt.verify(token, jwtSecret);
         return decodedToken.data;
      } catch (error) {
         return null;
      }
   }

   public getMethodFromRequest(req: Request): string {
      const method = req.method
      return method
   }
}
