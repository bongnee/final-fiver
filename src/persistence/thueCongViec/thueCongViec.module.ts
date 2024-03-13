import { Module } from '@nestjs/common';
import { ThueCongViecService } from './thueCongViec.service';
import { ThuecongviecController } from '../../usecase/thueCongViecController/thueCongViec.controller';
import { PrismaModule } from 'src/infrastructure/config/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [ThuecongviecController],
  providers: [ThueCongViecService]
})
export class ThueCongViecModule { }
