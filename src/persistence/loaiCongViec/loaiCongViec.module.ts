import { Module } from '@nestjs/common';
import { LoaiCongViecService } from './loaiCongViec.service';
import { LoaiCongViecController } from '../../usecase/loaiCongViecController/loaiCongViec.controller';
import { PrismaModule } from 'src/infrastructure/config/prisma/prisma.module';
@Module({
  controllers: [LoaiCongViecController],
  imports: [PrismaModule],
  providers: [LoaiCongViecService]
})
export class LoaiCongViecModule { }
