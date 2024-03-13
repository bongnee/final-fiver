import { CreateThueCongViecDTO, UpdateThueCongViecDTO } from "src/application/dto/thueCongViecDto";

export interface ThueCongViecRepository {
   getListHiringJobs(pageSize: number): Promise<any>
   getHiringJobDetail(id: number): Promise<any>;
   getListHiredJobByUser(userId: number): Promise<any>;
   createNewHiringJob(data: CreateThueCongViecDTO): Promise<any>;
   compeleteHiringJob(id: number): Promise<any>
   updateHiringJobInformation(data: UpdateThueCongViecDTO, id: number): Promise<any>;
   deleteHiringJob(id: number): Promise<any>
}