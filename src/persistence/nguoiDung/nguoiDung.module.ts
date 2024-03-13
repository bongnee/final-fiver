import { Module } from "@nestjs/common";
import { NguoiDungService } from "./nguoiDung.service";
import { PrismaModule } from "src/infrastructure/config/prisma/prisma.module";
import { NguoiDungController } from "src/usecase/nguoiDungController/nguoiDung.controller";

@Module({
   providers: [NguoiDungService],
   imports: [PrismaModule],
   controllers: [NguoiDungController]
})
export class NguoiDungModule { }