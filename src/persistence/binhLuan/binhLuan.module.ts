import { Module } from '@nestjs/common';
import { BinhLuanService } from './binhLuan.service';
import { BinhLuanController } from '../../usecase/binhLuanController/binhLuan.controller';
import { PrismaModule } from 'src/infrastructure/config/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [BinhLuanController],
  providers: [BinhLuanService]
})
export class BinhLuanModule { }
