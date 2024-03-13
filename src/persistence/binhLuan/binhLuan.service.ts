import { Injectable } from '@nestjs/common';
import { CreateBinhLuanDTO, UpdateBinhLuanDTO } from 'src/application/dto/binhLuanDto';
import { BinhLuanRepository } from 'src/application/repositories/business/binhLuanRepository.interface';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';

@Injectable()
export class BinhLuanService implements BinhLuanRepository {
  constructor(private readonly prisma: PrismaService) {

  }

  async getListComment(pageNumber: number = 1): Promise<any> {
    let pageSize = 10
    const index = ((+pageNumber) - 1) * pageSize
    let data = await this.prisma.usePrisma().binh_luan.findMany({
      skip: index,
      take: pageSize,
    });
    return {
      data: data,
      page: +pageNumber
    }
  }

  async getCommentByJob(jobId: number, pageNumber: string) {
    return await this.prisma.usePrisma().cong_viec.findFirst({
      where: {
        id: jobId
      },
      include: {
        binh_luan: true
      }
    })
  }

  async getCommentDetail(id: number): Promise<any> {
    return await this.prisma.findOne('binh_luan', id)
  }

  async createNewComment(data: CreateBinhLuanDTO): Promise<any> {
    const { id_cong_viec, id_nguoi_dung } = data
    const congViec = await this.prisma.findOne('cong_viec', id_cong_viec)
    const nguoiDung = await this.prisma.findOne('nguoi_dung', id_nguoi_dung)
    const ngay_binh_luan = new Date()
    if (congViec && nguoiDung) {
      return await this.prisma.create('binh_luan', { ...data, ngay_binh_luan: ngay_binh_luan.toISOString(), })
    } else {
      return "Công việc hoặc người dùng không tồn tại"
    }

  }

  async editComment(data: UpdateBinhLuanDTO, id: number): Promise<any> {
    return await this.prisma.update('binh_luan', id, data)
  }

  async deleteComment(id: number): Promise<any> {
    return await this.prisma.delete('binh_luan', id)
  }
}
