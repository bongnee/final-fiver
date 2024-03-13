import { CreateNguoiDungAdminDTO } from "src/application/dto/nguoiDungDto";
import { UpdateNguoiDungDTO } from "src/application/dto/nguoiDungDto";
export interface NguoiDungRepository {
   getUserList(pageNumber: number): Promise<any>;
   getUserDetail(id: number): Promise<any>;
   checkExistedEmail(email: string): Promise<any>;
   searchUserByName(email: string): Promise<any>;
   createNewUser(data: CreateNguoiDungAdminDTO): Promise<any>;
   updateUserInformation(data: UpdateNguoiDungDTO, userIdToUpdate: number): Promise<any>;
   deleteUser(id: number): Promise<any>
   changePassword(id: number, data: string): Promise<any>;

}