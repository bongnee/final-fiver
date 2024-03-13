import { CreateChiTietLoaiCongViecDTO, UpdateChiTietLoaiCongViecDTO } from "src/application/dto/chiTietLoaiCongViecDto";
export interface ChiTietLoaiCongViecRepository {
   getListJobTypeDetail(pageNumber: number): Promise<any>;
   getJobTypeDetailById(id: number): Promise<any>;
   createNewJobTypeDetail(data: CreateChiTietLoaiCongViecDTO, file: Express.Multer.File): Promise<any>;
   updateJobTypeDetail(data: UpdateChiTietLoaiCongViecDTO, id: number): Promise<any>
   updateJobTypeDetailAvatar(data: Express.Multer.File, id: number): Promise<any>;
   deleteJobTypeDetail(id: number): Promise<any>
}