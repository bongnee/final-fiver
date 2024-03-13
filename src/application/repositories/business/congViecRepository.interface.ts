import { CreateCongViecDTO, UpdateCongViecDTO } from "src/application/dto/congViecDto"

export interface CongViecRepository {
   getJobList(pageNumber: number): Promise<any>
   getJobDetail(id: number): Promise<any>
   getJobByJobTypeDetail(idJobTypeDetail: number): Promise<any>
   getJobListByName(name: string): Promise<any>
   createNewJob(data: CreateCongViecDTO): Promise<any>
   updateJobInfor(jobId: number, data: UpdateCongViecDTO): Promise<any>
   deleteJob(id: number): Promise<any>
}