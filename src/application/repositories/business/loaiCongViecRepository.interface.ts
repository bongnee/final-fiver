import { CreateLoaiCongViecDTO, UpdateLoaiCongViecDTO } from "src/application/dto/loaiCongViecDto";
export interface LoaiCongViecRepository {
   getListJobType(pageNumber: number): Promise<any>;
   getJobTypeDetail(id: number): Promise<any>;
   createNewJobType(data: CreateLoaiCongViecDTO): Promise<any>;
   updateJobType(data: UpdateLoaiCongViecDTO, id: number): Promise<any>
   deleteJobType(id: number): Promise<any>
}