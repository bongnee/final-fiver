import { Injectable } from '@nestjs/common';
import { CreateLoaiCongViecDTO, UpdateLoaiCongViecDTO } from 'src/application/dto/loaiCongViecDto';
import { LoaiCongViecRepository } from 'src/application/repositories/business/loaiCongViecRepository.interface'
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';
@Injectable()
export class LoaiCongViecService implements LoaiCongViecRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async getListJobType(pageNumber: number = 1): Promise<any> {
    let data = await this.prisma.findAll('loai_cong_viec')
    return data
  }
  async getJobTypeDetail(id: number): Promise<any> {
    let data = await this.prisma.findOne('loai_cong_viec', id)
    if (data) {
      return data
    } else {
      return "Không tìm thấy loại công việc"
    }
  }
  async createNewJobType(body: CreateLoaiCongViecDTO): Promise<any> {
    const { ten_loai } = body
    const jobType = await this.prisma.usePrisma().loai_cong_viec.findFirst(
      {
        where: {
          ten_loai,
        }
      }
    )
    if (jobType) {
      return "Loại công việc đã tồn tại"
    } else {
      let newJobType = {
        ten_loai,
      }
      let data = await this.prisma.create('loai_cong_viec', newJobType)
      return data
    }
  }
  
  async updateJobType(data: UpdateLoaiCongViecDTO, id: number): Promise<any> {
    let jobType = await this.prisma.findOne('loai_cong_viec', id)
    if (jobType) {
      await this.prisma.update('loai_cong_viec', id, data)
    }
    else {
      return "Không tìm thấy loại công việc"
    }
  }
  async deleteJobType(id: number): Promise<any> {
    let jobType = await this.prisma.findOne('loai_cong_viec', id)
    if (jobType !== null) {
      let data = await this.prisma.delete("loai_cong_viec", id)
      return data
    } else {
      return "Không tìm thấy loại công việc"
    }
  }
}
