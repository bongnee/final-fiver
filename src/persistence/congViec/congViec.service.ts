import { Injectable } from '@nestjs/common';
import { CreateCongViecDTO, UpdateCongViecDTO } from 'src/application/dto/congViecDto';
import { CongViecRepository } from 'src/application/repositories/business/congViecRepository.interface';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';
@Injectable()
export class CongViecService implements CongViecRepository {
   constructor(private readonly prisma: PrismaService,
   ) {
   }
   async getJobList(pageNumber: number = 1): Promise<any> {
      let pageSize = 10
      const index = ((+pageNumber) - 1) * pageSize
      let data = await this.prisma.usePrisma().cong_viec.findMany({
         skip: index,
         take: pageSize,
      });
      return {
         data: data,
         page: +pageNumber
      }
   }

   async getJobDetail(id: number): Promise<any> {
      let isJobExisted = await this.prisma.usePrisma().cong_viec.findFirst({
         where: {
            id,
         }, include: {
            nguoi_dung: {
               select: {
                  id: true,
                  ten: true,
                  email: true,
                  dien_thoai: true,
                  ky_nang: true,
                  chung_chi: true
               }

            },
            chi_tiet_loai_cong_viec: {
               include: {
                  loai_cong_viec: true,
               }
            }
         }
      }
      )

      if (isJobExisted) {
         return isJobExisted
      } else {
         return "Công việc không tồn tại"
      }
   }

   async getJobByJobTypeDetail(idJobTypeDetail: number): Promise<any> {
      let data = await this.prisma.usePrisma().chi_tiet_loai_cong_viec.findFirst({
         where: {
            id: idJobTypeDetail
         }, include: {
            cong_viec: true
         }
      })
      return data
   }

   async getJobListByName(name: string): Promise<any> {
      const congViec = await this.prisma.usePrisma().cong_viec.findMany({
         where: {
            OR: [
               {
                  ten_cong_viec: {
                     contains: name
                  }
               },
               {
                  ten_cong_viec: {
                     startsWith: name
                  }
               }
            ]

         }
      });
      return congViec
   }

   async createNewJob(data: CreateCongViecDTO): Promise<any> {
      const { ten_cong_viec } = data
      let isJobExisted = await this.prisma.usePrisma().cong_viec.findFirst({
         where: {
            ten_cong_viec: ten_cong_viec.trim()
         }
      })
      if (isJobExisted) {
         return "Công việc đã tồn tại"
      } else {
         await this.prisma.create('cong_viec', data)
      }
   }

   async updateJobInfor(jobId: number, data: UpdateCongViecDTO): Promise<any> {
      let isJobExisted = this.prisma.findOne('cong_viec', jobId)
      if (isJobExisted) {
         await this.prisma.update('cong_viec', jobId, data)
      } else {
         return "Công việc không tồn tại"
      }
   }

   async deleteJob(id: number): Promise<any> {
      let isJobExisted = this.prisma.findOne('cong_viec', id)
      if (isJobExisted) {
         await this.prisma.delete('cong_viec', id)
      } else {
         return "Công việc không tồn tại"
      }
   }
}
