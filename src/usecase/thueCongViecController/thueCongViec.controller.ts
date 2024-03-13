import { Controller, Get, Post, Put, Delete, Param, Query, HttpStatus, Req, Res, Body, ValidationPipe } from '@nestjs/common';
import { ThueCongViecService } from '../../persistence/thueCongViec/thueCongViec.service';
import { customResponse } from 'src/shared/response/customResponse';
import { CreateThueCongViecDTO, UpdateThueCongViecDTO } from 'src/application/dto/thueCongViecDto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist/decorators';

@ApiTags('Thue Cong Viec')
@ApiBearerAuth()
@Controller('hiring-job')
export class ThuecongviecController {
  constructor(private readonly thuecongviecService: ThueCongViecService) { }


  @Get('/get-list-hiring-job')
  async getListHiringJobs(@Query() query: any): Promise<any> {
    try {
      const { pageNumber } = query
      const data = await this.thuecongviecService.getListHiringJobs(pageNumber)
      return customResponse(data, HttpStatus.OK, "Lấy danh sách thuê công việc thành công")
    }
    catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Get('/get-hiring-job-detail/:id')
  async getHiringJobDetail(@Param('id') id: number): Promise<any> {
    try {
      const data = await this.thuecongviecService.getHiringJobDetail(+id)
      return customResponse(data, HttpStatus.OK, "Lấy chi tiết thuê công việc thành công")
    }
    catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Get('/get-hiring-job-by-user/:id')
  async getListHiredJobByUser(@Param('id') userId: number): Promise<any> {
    try {
      const data = await this.thuecongviecService.getListHiredJobByUser(+userId)
      return customResponse(data, HttpStatus.OK, "Lấy danh sách công việc đã thuê theo người dùng thành công")
    }
    catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Post('/create-new-hiring-job')
  async createNewHiringJob(@Body(new ValidationPipe()) body: CreateThueCongViecDTO) {
    try {
      const data = await this.thuecongviecService.createNewHiringJob(body)
      return customResponse(data, HttpStatus.CREATED, "Tạo bản ghi thuê công việc mới thành công")
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Post('/complete-hiring-job/:id')
  async completeHiringJob(@Param('id') id: number) {
    try {
      return customResponse(null, HttpStatus.OK, "Cập nhật trạng thái công việc thành công")
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Put('/update-hiring-job/:id')
  async updateHiringJobInformation(@Param('id') id: number, @Body() body: UpdateThueCongViecDTO) {
    try {
      await this.thuecongviecService.updateHiringJobInformation(body, +id)
      return customResponse(null, HttpStatus.OK, "Cập nhật trạng thái thuê công việc thành công")
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Delete('/delete-hiring-job/:id')
  async deleteHiringJob(@Param('id') id: number) {
    try {
      await this.thuecongviecService.deleteHiringJob(+id)
      return customResponse(null, HttpStatus.OK, "Xóa bản ghi thuê công việc thành công")
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }
}


