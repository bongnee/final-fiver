import { Injectable } from '@nestjs/common';
import { CreateThueCongViecDTO, UpdateThueCongViecDTO } from 'src/application/dto/thueCongViecDto';
import { ThueCongViecRepository } from 'src/application/repositories/business/thueCongViecRepository.interface';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';
@Injectable()
export class ThueCongViecService implements ThueCongViecRepository {
   constructor(private readonly prisma: PrismaService) {

   }
   async getListHiringJobs(pageNumber: number = 1): Promise<any> {
      let pageSize = 10
      const index = ((+pageNumber) - 1) * pageSize
      const data = await this.prisma.usePrisma().thue_cong_viec.findMany({
         skip: index, take: pageSize,
         include: {
            cong_viec: {
               select: {
                  ten_cong_viec: true
               }
            },
            nguoi_dung: {
               select: {
                  ten: true
               }
            }
         }
      })
      return {
         data,
         page: +pageNumber,
      }
   }

   async getHiringJobDetail(id: any): Promise<any> {
      const hiringJobDetail = await this.prisma.usePrisma().thue_cong_viec.findFirst({
         where: {
            id: id,
         }, include: {
            nguoi_dung: true,
            cong_viec: true,
         }
      })
      if (hiringJobDetail) {
         return hiringJobDetail
      } else {
         return "Không tìm thấy"
      }
   }

   async getListHiredJobByUser(userId: number): Promise<any> {
      return this.prisma.usePrisma().nguoi_dung.findFirst({
         where: { id: userId },
         include: {
            thue_cong_viec: {
               include: {
                  cong_viec: {
                     select: {
                        ten_cong_viec: true,
                        gia_tien: true,
                        hinh_anh: true,
                        sao_cong_viec: true,
                     }
                  },
               },
            },
         },
      })
   }

   async createNewHiringJob(data: CreateThueCongViecDTO): Promise<any> {
      let date = new Date()
      data = { ...data, ngay_thue: date.toISOString() }
      await this.prisma.create('thue_cong_viec', data)
      return data
   }

   async compeleteHiringJob(id: number): Promise<any> {
      const hiringJob: any = await this.prisma.findOne('thue_cong_viec', id)
      return await this.prisma.usePrisma().thue_cong_viec.update({
         where: {
            id,
         },
         data: {
            hoan_thanh: !hiringJob.hoan_thanh
         }
      })
   }

   async updateHiringJobInformation(data: UpdateThueCongViecDTO, id: number): Promise<any> {
      data.ngay_thue = new Date(data.ngay_thue)
      return await this.prisma.update('thue_cong_viec', id, data)

   }

   async deleteHiringJob(id: number): Promise<any> {
      return await this.prisma.delete('thue_cong_viec', id)
   }
}
