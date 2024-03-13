import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseInterceptors, Req } from '@nestjs/common';
import { CreateChiTietLoaiCongViecDTO, UpdateChiTietLoaiCongViecDTO } from 'src/application/dto/chiTietLoaiCongViecDto';
import { customResponse } from 'src/shared/response/customResponse';
import { ChiTietLoaiCongViecService } from '../../persistence/chiTietLoaiCongViec/chiTietLoaiCongViec.service';
import { FileInterceptor, } from '@nestjs/platform-express';
import { Put, UploadedFile } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/domain/enums/role.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist/decorators';

@ApiTags('Chi Tiet Loai Cong Viec')
@ApiBearerAuth()
@Controller('job-type-detail')
export class ChiTietLoaiCongViecController {
  constructor(private readonly chiTietLoaiCongViecService: ChiTietLoaiCongViecService
  ) { }

  @Roles(Role.Admin, Role.User)
  @Get('/get-list-job-type-details')
  async getListJobTypeDetail() {
    try {
      let data = await this.chiTietLoaiCongViecService.getListJobTypeDetail();
      return customResponse(data, HttpStatus.OK, "Lấy danh sách chi tiết loại công việc thành công")
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Roles(Role.Admin, Role.User)
  @Get('/get-job-type-detail/:id')
  async getJobTypeDetailById(@Param('id') id: number) {
    try {
      let data = await this.chiTietLoaiCongViecService.getJobTypeDetailById(+id)
      if (typeof data !== "string") {
        return customResponse(data, HttpStatus.OK, "Lấy chi tiết loại công việc thành công")
      } else {
        return customResponse(null, HttpStatus.NOT_FOUND, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }
  @Roles(Role.Admin)
  @Post('/create-new-job-type-detail')
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => callback(null, Date.now() + "_" + file.originalname),
    })
  }))
  async createNewJobTypeDetail(@Body() body: CreateChiTietLoaiCongViecDTO, @UploadedFile() file: Express.Multer.File) {
    try {
      let data = await this.chiTietLoaiCongViecService.createNewJobTypeDetail(body, file)
      if (typeof data !== "string") {
        return customResponse(null, HttpStatus.CREATED, "Tạo chi tiết loại công việc thành công")
      } else {
        return customResponse(null, HttpStatus.CONFLICT, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Roles(Role.Admin)
  @Post('/update-avatar/:id')
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => callback(null, Date.now() + "_" + file.originalname),
    })
  }))
  
  async updateJobTypeDetailAvatar(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    try {
      let data = await this.chiTietLoaiCongViecService.updateJobTypeDetailAvatar(file, +id)
      if (typeof data !== "string") {
        return customResponse(null, HttpStatus.CREATED, "Cập nhật avatar loại công việc thành công")
      } else {
        return customResponse(null, HttpStatus.NOT_FOUND, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Roles(Role.Admin)
  @Put('/update-job-type-detail/:id')
  async updateJobDetailInfor(@Param('id') id: number, @Body() body: UpdateChiTietLoaiCongViecDTO) {
    try {
      let data = await this.chiTietLoaiCongViecService.updateJobTypeDetail(body, +id)
      if (typeof data !== "string") {
        return customResponse(null, HttpStatus.CREATED, "Update chi tiết loại công việc thành công")
      } else {
        return customResponse(null, HttpStatus.NOT_FOUND, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Roles(Role.Admin)
  @Delete('/detail-job-type-detail/:id')
  async deleteJobDetailInfor(@Param('id') id: number) {
    try {
      let data = await this.chiTietLoaiCongViecService.deleteJobTypeDetail(+id)
      if (typeof data !== "string") {
        return customResponse(null, HttpStatus.OK, "Xóa chi tiết loại công việc thành công")
      } else {
        return customResponse(null, HttpStatus.NOT_FOUND, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

}
