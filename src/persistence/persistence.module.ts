import { Module } from '@nestjs/common';
import { NguoiDungModule } from './nguoiDung/nguoiDung.module';
import { CongViecModule } from './congViec/congViec.module';
import { LoaiCongViecModule } from './loaiCongViec/loaiCongViec.module';
import { ChiTietLoaiCongViecModule } from './chiTietLoaiCongViec/chiTietLoaiCongViec.module';
import { ThueCongViecModule } from './thueCongViec/thueCongViec.module';
import { BinhLuanModule } from './binhLuan/binhLuan.module';

@Module({
   imports: [NguoiDungModule, CongViecModule, LoaiCongViecModule, ChiTietLoaiCongViecModule, ThueCongViecModule, BinhLuanModule],
   exports: [NguoiDungModule, CongViecModule, LoaiCongViecModule, ChiTietLoaiCongViecModule, ThueCongViecModule, BinhLuanModule]
})
export class PersistenceModule { }