import { CreateBinhLuanDTO, UpdateBinhLuanDTO } from "src/application/dto/binhLuanDto";

export interface BinhLuanRepository {
   getListComment(pageNumber: number): Promise<any>
   getCommentDetail(id: number): Promise<any>;
   getCommentByJob(jobId: number, pageNumber: string): Promise<any>
   createNewComment(data: CreateBinhLuanDTO): Promise<any>;
   editComment(data: UpdateBinhLuanDTO, id: number): Promise<any>;
   deleteComment(id: number): Promise<any>
}