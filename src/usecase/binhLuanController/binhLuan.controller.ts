import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, ValidationPipe, Put } from '@nestjs/common';
import { BinhLuanService } from '../../persistence/binhLuan/binhLuan.service';
import { CreateBinhLuanDTO, UpdateBinhLuanDTO } from 'src/application/dto/binhLuanDto';
import { customResponse } from 'src/shared/response/customResponse';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist/decorators';

@ApiTags('Binh Luan')
@ApiBearerAuth()
@Controller('comment')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) { }

  @Get('/get-list-comment')
  async getListComment(@Query() query: any): Promise<any> {
    try {
      const { pageNumber } = query
      const data = await this.binhLuanService.getListComment(pageNumber)
      return data
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Get('/get-comments-by-job/:id')
  async getCommentByJob(@Param('id') jobId: number, @Query() query: any) {
    try {
      const { pageNumber } = query
      let data = await this.binhLuanService.getCommentByJob(+jobId, pageNumber)
      return customResponse(data, HttpStatus.OK, "Lấy danh sách bình luận theo công việc thành công")
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Get('/get-comment-detail/:id')
  async getCommentDetail(@Param("id") id: number) {
    try {
      let data = await this.binhLuanService.getCommentDetail(+id)
      return customResponse(data, HttpStatus.OK, "Lấy chi tiết comment thành công")
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Post('/create-new-comment')
  async createNewComment(@Body(new ValidationPipe()) body: CreateBinhLuanDTO) {
    try {
      let data = await this.binhLuanService.createNewComment(body)
      if (typeof data !== "string") {
        return customResponse(data, HttpStatus.CREATED, "Tạo bình luận thành công")
      } else {
        return customResponse(null, HttpStatus.NOT_FOUND, data)
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Put("/edit-comment/:id")
  async editComment(@Param('id') id: number, @Body() body: UpdateBinhLuanDTO) {
    try {
      await this.binhLuanService.editComment(body, +id)
      return customResponse(null, HttpStatus.OK, "Cập nhật bình luận thành công")
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

  @Delete('/delete-comment/:id')
  async deleteComment(@Param('id') id: number) {
    try {
      await this.binhLuanService.deleteComment(+id)
      return customResponse(null, HttpStatus.OK, "Xóa bình luận thành công")
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }

}
