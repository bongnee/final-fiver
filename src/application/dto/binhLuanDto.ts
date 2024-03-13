import { IsNumber, IsString, IsNotEmpty, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";
export class CreateBinhLuanDTO {
   @IsNotEmpty()
   @IsNumber()
   @Min(0)
   @ApiProperty()
   id_cong_viec: number;

   @IsNotEmpty()
   @IsNumber()
   @Min(0)
   @ApiProperty()
   id_nguoi_dung: number;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   noi_dung: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   sao_binh_luan: string
}

export class UpdateBinhLuanDTO {
   @IsNotEmpty()
   @IsNumber()
   @Min(0)
   @ApiProperty()
   id_cong_viec: number;

   @ApiProperty()
   @IsNotEmpty()
   @IsNumber()
   @Min(0)
   id_nguoi_dung: number;

   @IsString()
   @ApiProperty()
   noi_dung: string;

   @IsString()
   @ApiProperty()
   sao_binh_luan: string
}