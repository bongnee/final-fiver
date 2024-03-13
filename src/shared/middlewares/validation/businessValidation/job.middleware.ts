import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment/environment.service';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class JobMiddleware implements NestMiddleware {
   constructor(private readonly config: EnvironmentConfigService) {
   }
   async use(req: Request, res: Response, next: NextFunction) {
      const token = req.headers.authorization;
      const jobId = Number(req.params.id)
      const bearerPrefix = 'Bearer ';
      let newToken = token.substring(bearerPrefix.length);
      const decodedToken: any = jwt.verify(newToken, this.config.getJwtSecret())
      const { id } = decodedToken.data
      const prisma = new PrismaClient()
      let jobToUpdate = await prisma.cong_viec.findFirst({
         where: {
            id: jobId
         }
      })
      if (jobToUpdate) {
         if (jobToUpdate.id_nguoi_dung !== id) {
            return res.status(403).json({ message: 'Bạn không thể thao tác với công việc của người khác' });
         } else {
            next()
         }
      } else {
         return res.status(404).json({ message: 'Không tìm thấy công việc' });
      }

   }
}
