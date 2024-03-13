import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment/environment.service';
import { PrismaClient } from '@prisma/client';
import { AuthUtils } from 'src/shared/utils/authUtils/authUtils';
import { Method } from 'src/domain/enums/method.enum';
@Injectable()
export class BinhLuanMiddleware implements NestMiddleware {
   constructor(private readonly config: EnvironmentConfigService,
      private readonly authService: AuthUtils) {
   }
   async use(req: Request, res: Response, next: NextFunction) {
      const method = this.authService.getMethodFromRequest(req)
      const commentId = Number(req.params.id)
      let newToken = this.authService.getTokenFromRequest(req)
      const { id } = this.authService.getDecodedToken(newToken, this.config.getJwtSecret())
      const prisma = new PrismaClient()
      let comment = await prisma.binh_luan.findFirst({
         where: {
            id: commentId
         }
      })
      if (comment) {
         if (method === Method.GET) {
            return next()
         } else {
            if (comment.id_nguoi_dung !== id) {
               return res.status(403).json({ message: 'Bạn không thể thao tác với bình luận của người khác', error: 403 });
            } else {
               next()
            }
         }
      } else {
         return res.status(404).json({ message: 'Không tìm thấy bình luận', error: 404 });
      }

   }
}
