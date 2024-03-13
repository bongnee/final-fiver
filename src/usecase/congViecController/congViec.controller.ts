import { Controller, Get, Query, Param, Post, Body, ValidationPipe, Put, Delete, Req } from '@nestjs/common';
import { CongViecService } from '../../persistence/congViec/congViec.service';
import { customResponse } from 'src/shared/response/customResponse';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateCongViecDTO, UpdateCongViecDTO } from 'src/application/dto/congViecDto';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger/dist/decorators';


@ApiBearerAuth()
@ApiTags('Cong Viec')
@Controller('job')
export class CongViecController {
  constructor(private readonly congViecService: CongViecService) { }

  @Get('/get-list-jobs')
  async getListJobs(@Query() query: any): Promise<any> {
    try {
      const { pageNumber } = query
      const data = await this.congViecService.getJobList(pageNumber)
      return customResponse(data, HttpStatus.OK, "Lấy danh sách công việc thành công")
    }
    catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Get('/get-job-detail/:id')
  async getJobDetail(@Param('id') id: number) {
    try {
      let data = await this.congViecService.getJobDetail(+id)
      if (typeof data !== "string") {
        return customResponse(data, HttpStatus.OK, "Lấy chi tiết công việc thành công")
      } else {
        return customResponse(null, HttpStatus.NOT_FOUND, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Get('/get-job-list-by-job-type-detail/:id')
  async getJobByJobTypeDetail(@Param('id') id: number) {
    try {
      const data = await this.congViecService.getJobByJobTypeDetail(+id)
      return customResponse(data, HttpStatus.OK, "Lấy danh sách công việc theo chi tiết loại thành công")
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Get('/get-job-list-by-name')
  @ApiQuery({ name: "job name", type: "string" })
  async getJobListByName(@Query() query: any) {
    try {
      const { jobName } = query
      const data = await this.congViecService.getJobListByName(jobName)
      return customResponse(data, HttpStatus.OK, "Lấy danh sách công việc theo chi tiết loại thành công")
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }


  @Post('/create-new-job')
  async createNewJob(@Body(new ValidationPipe()) body: CreateCongViecDTO) {
    try {
      let data = await this.congViecService.createNewJob(body)
      if (typeof data !== "string") {
        return customResponse(null, HttpStatus.CREATED, "Tạo công việc mới thành công")
      } else {
        return customResponse(null, HttpStatus.CONFLICT, "Công việc đã tồn tại")
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }


  @Put('/update-job-information/:id')
  async updateJobInformation(@Param('id') jobId: number, @Body(new ValidationPipe()) body: UpdateCongViecDTO) {
    try {
      let data = await this.congViecService.updateJobInfor(+jobId, body)
      if (typeof data !== "string") {
        return customResponse(null, HttpStatus.CREATED, "Cập nhật công việc thành công")
      } else {
        return customResponse(null, HttpStatus.NOT_FOUND, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }


  @Delete('/delete-job/:id')
  async deleteJob(@Param('id') id: number) {
    try {
      let data = await this.congViecService.deleteJob(+id)
      if (typeof data !== "string") {
        return customResponse(null, HttpStatus.OK, "Xóa công việc thành công")
      } else {
        return customResponse(null, HttpStatus.NOT_FOUND, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }
}



