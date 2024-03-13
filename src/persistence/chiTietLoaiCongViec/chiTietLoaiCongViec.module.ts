import { Module } from '@nestjs/common';
import { ChiTietLoaiCongViecService } from './chiTietLoaiCongViec.service';
import { ChiTietLoaiCongViecController } from '../../usecase/chiTietLoaiCongViecController/chiTietLoaiCongViec.controller';
import { PrismaModule } from 'src/infrastructure/config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChiTietLoaiCongViecController],
  providers: [ChiTietLoaiCongViecService]
})
export class ChiTietLoaiCongViecModule { }
