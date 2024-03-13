import { Controller, Get, Post, Body, Param, Delete, UseGuards, Res, Query, ValidationPipe, Put, Request, Patch, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { customResponse } from 'src/shared/response/customResponse';
import { NguoiDungService } from 'src/persistence/nguoiDung/nguoiDung.service';
import { Role } from 'src/domain/enums/role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { HttpStatus } from '@nestjs/common';
import { ChangePasswordDTO, CreateNguoiDungAdminDTO } from 'src/application/dto/nguoiDungDto';
import { UpdateNguoiDungDTO } from 'src/application/dto/nguoiDungDto';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger/dist/decorators';

@ApiTags('Nguoi Dung')
@ApiBearerAuth()
@Controller('user')
export class NguoiDungController {
   constructor(private readonly nguoiDungService: NguoiDungService) {
   }

   @Roles(Role.Admin)
   @Get('/list-user')
   async getUserList(@Res() response: any, @Query() query: any): Promise<any> {
      try {
         const { pageNumber } = query
         const data = await this.nguoiDungService.getUserList(pageNumber);
         return response.send(customResponse(data, HttpStatus.OK, "Lấy danh sách người dùng thành công"))
      } catch (error) {
         return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
      }
   }

   @Get('/get-user-detail/:id')
   async getUserDetail(@Param('id') id: number): Promise<any> {
      try {
         let data = await this.nguoiDungService.getUserDetail(+id)
         if (typeof data !== "string") {
            return customResponse(data, HttpStatus.OK, "Lấy chi tiết người dùng thành công")
         } else {
            return customResponse(null, HttpStatus.NOT_FOUND, data)
         }
      } catch (error) {
         return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
      }
   }

   @Get('/check-existed-email')
   async checkExistedEmail(@Query() query: any, @Res() response: any): Promise<any> {
      try {
         const { userEmail } = query
         let data = await this.nguoiDungService.checkExistedEmail(userEmail)
         return response.send(customResponse(null, HttpStatus.OK, data))
      } catch (error) {
         return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
      }
   }

   @Get('/search-user-by-name')
   @ApiQuery({ name: "user name", type: "string" })
   async searchUserByEmail(@Query() query: any): Promise<any> {
      try {
         const { ten } = query
         let data = await this.nguoiDungService.searchUserByName(ten)
         return customResponse(data, HttpStatus.OK, "Tìm user thành công")
      } catch (error) {
         return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
      }
   }

   @Roles(Role.Admin)
   @Post('/create-user')
   async createNewUser(@Body(new ValidationPipe()) newUser: CreateNguoiDungAdminDTO) {
      try {
         let data = await this.nguoiDungService.createNewUser(newUser)
         if (typeof data !== "string") {
            return customResponse(null, HttpStatus.OK, "Tạo thành công")
         } else {
            return customResponse(null, HttpStatus.CONFLICT, data)
         }
      } catch (error) {
         return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
      }
   }


   @Put('/update-user-information/:id')
   async updateUserInformation(@Body(new ValidationPipe()) userInformation: UpdateNguoiDungDTO, @Request() request: any, @Param('id') userIdToUpdate: number) {
      try {
         const { id, role } = request.user.data
         if (role === Role.Admin) {
            let data = await this.nguoiDungService.updateUserInformation(userInformation, (+userIdToUpdate))
            return customResponse(data, HttpStatus.CREATED, data)
         } else {
            if (id !== (+userIdToUpdate)) {
               return customResponse(null, HttpStatus.FORBIDDEN, "Bạn không có quyền sửa người dùng khác")
            } else {
               let data = await this.nguoiDungService.updateUserInformation(userInformation, (+userIdToUpdate))
               return customResponse(null, HttpStatus.CREATED, data)
            }
         }
      }
      catch (error) {
         return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
      }
   }

   @Delete('/delete-user/:id')
   async deleteUser(@Param('id') userIdToDelete: number, @Req() request: any) {
      try {
         const { id, role } = request.user.data
         userIdToDelete = Number(userIdToDelete)
         if (role === Role.Admin) {
            let data = await this.nguoiDungService.deleteUser(userIdToDelete)
            return customResponse(null, HttpStatus.OK, data)
         } else {
            if (id !== userIdToDelete) {
               return customResponse(null, HttpStatus.FORBIDDEN, "Bạn không có quyền xóa người dùng khác")
            } else {
               let data = await this.nguoiDungService.deleteUser(userIdToDelete)
               return customResponse(null, HttpStatus.OK, data)
            }
         }
      } catch (error) {
         return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
      }
   }

   @Patch('/change-password/:id')
   @ApiBody({ type: ChangePasswordDTO })
   async changePassword(@Param('id') userId: number, @Body() body: any) {
      try {
         let data = await this.nguoiDungService.changePassword(+userId, body.password)
         if (typeof data !== "string") {
            return customResponse(data, HttpStatus.OK, "Cập nhật password thành công")
         } else {
            return customResponse(data, HttpStatus.NOT_FOUND, data)
         }
      } catch (error) {
         return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
      }
   }

}