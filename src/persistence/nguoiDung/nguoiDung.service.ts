import { Injectable } from '@nestjs/common';
import { NguoiDungRepository } from 'src/application/repositories/business/nguoiDungRepository.interface';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateNguoiDungAdminDTO, NguoiDungDTO, UpdateNguoiDungDTO } from 'src/application/dto/nguoiDungDto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class NguoiDungService implements NguoiDungRepository {
   constructor(private readonly prisma: PrismaService,
   ) {
   }
   async getUserList(pageNumber: number = 1): Promise<any> {
      let pageSize = 2
      const index = ((+pageNumber) - 1) * pageSize;
      let data = await this.prisma.usePrisma().nguoi_dung.findMany({
         skip: index,
         take: pageSize,
      })
      const userDtos = plainToInstance(NguoiDungDTO, data)
      return {
         data: userDtos,
         page: +pageNumber
      }
   }

   async getUserDetail(id: number): Promise<any> {
      let data = await this.prisma.findOne("nguoi_dung", id)
      if (data) {
         return data
      } else {
         return "Không tìm thấy người dùng"
      }

   }

   async searchUserByName(name: string): Promise<any> {
      let data = await this.prisma.usePrisma().nguoi_dung.findMany({
         where: {
            ten: {
               contains: name,
            }
         }
      })
      return data;
   }
   async checkExistedEmail(email: string): Promise<any> {
      let user = await this.prisma.usePrisma().nguoi_dung.findFirst({
         where: {
            email,
         }
      })
      if (user) {
         return "Email đã tồn tại"
      } else {
         return "Email chưa đăng ký"
      }
   }

   async createNewUser(userRegister: CreateNguoiDungAdminDTO): Promise<any> {
      const { email, password, ten, role } = userRegister;
      const isUserExisted = await this.prisma.usePrisma().nguoi_dung.findFirst({
         where: {
            email
         }
      })
      if (isUserExisted) {
         return "Email đã tồn tại"
      } else {
         let hashPassword = await bcrypt.hash(password, 10)
         let newUser = {
            email,
            password: hashPassword,
            ten,
            role: role
         }
         await this.prisma.create('nguoi_dung', newUser)
      }
   }

   async updateUserInformation(data: UpdateNguoiDungDTO, userIdToUpdate: number): Promise<any> {
      const { ten, dien_thoai, ngay_sinh, gioi_tinh, ky_nang, chung_chi } = data
      const userToUpdate = {
         ten,
         dien_thoai,
         ngay_sinh,
         gioi_tinh,
         ky_nang: ky_nang.join(","),
         chung_chi: chung_chi.join(",")
      }
      await this.prisma.update("nguoi_dung", userIdToUpdate, userToUpdate)
      return "Update thành công"
   }

   async deleteUser(id: number): Promise<any> {
      await this.prisma.delete("nguoi_dung", id)
      return "Xóa thành công"
   }

   async changePassword(id: number, newPassword: string): Promise<any> {
      let user = await this.prisma.findOne('nguoi_dung', id)
      if (user) {
         let hashPassword = await bcrypt.hash(newPassword, 10)
         return await this.prisma.usePrisma().nguoi_dung.update({
            where: {
               id: id,
            },
            data: {
               password: hashPassword
            }
         })
      } else {
         return "Không tìm thấy người dùng"
      }
   }
}