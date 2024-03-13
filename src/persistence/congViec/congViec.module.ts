import { Module } from '@nestjs/common';
import { CongViecService } from './congViec.service';
import { CongViecController } from '../../usecase/congViecController/congViec.controller';
import { PrismaModule } from "src/infrastructure/config/prisma/prisma.module";

@Module({
  controllers: [CongViecController],
  imports: [PrismaModule],
  providers: [CongViecService]
})
export class CongViecModule { }
