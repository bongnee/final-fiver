import { Controller, Get, Post, Put, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LoaiCongViecService } from '../../persistence/loaiCongViec/loaiCongViec.service';
import { Role } from 'src/domain/enums/role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { customResponse } from 'src/shared/response/customResponse';
import { HttpStatus } from '@nestjs/common';
import { CreateLoaiCongViecDTO, UpdateLoaiCongViecDTO } from 'src/application/dto/loaiCongViecDto';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist/decorators';

@ApiTags('Loai Cong Viec')
@ApiBearerAuth()
@Controller('job-type')
export class LoaiCongViecController {
  constructor(private readonly loaiCongViecService: LoaiCongViecService) { }

  @Roles(Role.Admin, Role.User)
  @Get('/list-job-types')
  async getListJobTitle() {
    try {
      let data = await this.loaiCongViecService.getListJobType()
      return customResponse(data, HttpStatus.OK, "Lấy danh sách thành công")
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Roles(Role.Admin, Role.User)
  @Get('/job-type-detail/:id')
  async getJobTypeDetail(@Param('id') id: number) {
    try {
      let data = await this.loaiCongViecService.getJobTypeDetail(+id)
      if (typeof data !== "string") {
        return customResponse(data, HttpStatus.NOT_FOUND, "Lấy danh sách thành công")
      } else {
        return customResponse(null, HttpStatus.NOT_FOUND, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Roles(Role.Admin)
  @Post('/create-new-job-type')
  async createNewJobType(@Body() body: CreateLoaiCongViecDTO) {
    try {
      let data = await this.loaiCongViecService.createNewJobType(body)
      if (typeof data !== 'string') {
        return customResponse(null, HttpStatus.CREATED, "Tạo loại công việc thành công")
      } else {
        return customResponse(null, HttpStatus.CONFLICT, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Roles(Role.Admin)
  @Put('/update-job-type/:id')
  async updateJobType(@Body() body: UpdateLoaiCongViecDTO, @Param('id') jobTypeId: number) {
    try {
      let data = await this.loaiCongViecService.updateJobType(body, +jobTypeId)
      if (typeof data !== "string") {
        return customResponse(null, HttpStatus.CREATED, "Cập nhật loại công việc thành công")
      } else {
        return customResponse(null, HttpStatus.NOT_FOUND, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Roles(Role.Admin)
  @Delete('/delete-job-type/:id')
  async deleteJobType(@Param('id') jobTypeId: number) {
    try {
      let data = await this.loaiCongViecService.deleteJobType(+jobTypeId)
      if (typeof data !== "string") {
        return customResponse(null, HttpStatus.OK, "Xóa loại công việc thành công")
      } else {
        return customResponse(null, HttpStatus.NOT_FOUND, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }
}



