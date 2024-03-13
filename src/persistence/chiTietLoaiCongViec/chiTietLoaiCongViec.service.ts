import { Injectable } from '@nestjs/common';
import { CreateChiTietLoaiCongViecDTO, UpdateChiTietLoaiCongViecDTO } from 'src/application/dto/chiTietLoaiCongViecDto';
import { ChiTietLoaiCongViecRepository } from 'src/application/repositories/business/chiTietLoaiCongViecRepository.interface';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';


@Injectable()
export class ChiTietLoaiCongViecService implements ChiTietLoaiCongViecRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async getListJobTypeDetail(pageNumber: number = 1): Promise<any> {
    let data = await this.prisma.usePrisma().chi_tiet_loai_cong_viec.findMany({
      include: {
        loai_cong_viec: true,
      }
    })
    return data
  }

  async getJobTypeDetailById(idJobTypeDetail: number): Promise<any> {
    let jobTypeDetail = await this.prisma.usePrisma().chi_tiet_loai_cong_viec.findFirst({
      where: {
        id: idJobTypeDetail,
      }, include: {
        loai_cong_viec: true
      }
    })
    if (jobTypeDetail) {
      const { id, ten_chi_tiet, hinh_anh, id_loai, loai_cong_viec } = jobTypeDetail
      let jobTypeDetailToResponse = {
        id,
        ten_chi_tiet,
        hinh_anh: process.cwd() + "/public/img" + hinh_anh,
        id_loai,
        loai_cong_viec
      }
      return jobTypeDetailToResponse
    } else {
      return "Không tìm thấy chi tiết loại công việc"
    }

  }

  async createNewJobTypeDetail(data: CreateChiTietLoaiCongViecDTO, file: Express.Multer.File): Promise<any> {
    const { ten_chi_tiet, id_loai } = data
    let filename = ""
    if (file) {
      filename = file.filename
    }
    const isJobTypeDetailExisted: any = await this.prisma.usePrisma().chi_tiet_loai_cong_viec.findFirst({
      where: {
        ten_chi_tiet,
      }
    })
    if (isJobTypeDetailExisted) {
      return "Chi tiết loại công việc đã tồn tại"
    } else {
      let newJobTypeDetail = {
        ten_chi_tiet,
        id_loai: Number(id_loai),
        hinh_anh: filename ? filename : ""
      }
      await this.prisma.create('chi_tiet_loai_cong_viec', newJobTypeDetail)
    }

  }

  async updateJobTypeDetail(data: UpdateChiTietLoaiCongViecDTO, id: number): Promise<any> {
    let isJobTypeDetailExisted = await this.prisma.findOne('chi_tiet_loai_cong_viec', id)
    if (isJobTypeDetailExisted) {
      await this.prisma.update('chi_tiet_loai_cong_viec', id, data)
    } else {
      return "Chi tiết loại công việc không tồn tại"
    }

  }
  async updateJobTypeDetailAvatar(file: Express.Multer.File, id: number): Promise<any> {

    const { filename } = file
    let isJobTypeDetailExisted = await this.prisma.findOne('chi_tiet_loai_cong_viec', id)
    if (isJobTypeDetailExisted) {
      await this.prisma.usePrisma().chi_tiet_loai_cong_viec.update({
        where: {
          id,
        }, data: {
          hinh_anh: filename
        }
      })
    } else {
      return "Chi tiết loại công việc không tồn tại"
    }

  }
  async deleteJobTypeDetail(id: number): Promise<any> {
    let isJobTypeDetailExisted = await this.prisma.findOne('chi_tiet_loai_cong_viec', id)
    if (isJobTypeDetailExisted) {
      await this.prisma.delete('chi_tiet_loai_cong_viec', id)
    } else {
      return "Chi tiết loại công việc không tồn tại"
    }
  }
}
