import { IsString, IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class CreateCongViecDTO {

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   ten_cong_viec: string;

   @ApiPropertyOptional()
   @IsNumber()
   danh_gia: number;

   @ApiProperty()
   @IsNumber()
   @IsNotEmpty()
   gia_tien: number;

   @ApiPropertyOptional()
   @IsString()
   mo_ta: string;

   @ApiPropertyOptional()
   @IsString()
   mo_ta_ngan: string;

   @ApiPropertyOptional()
   @IsNumber()
   sao_cong_viec: number;

   @ApiProperty()
   @IsNumber()
   id_loai_cong_viec: number;

   @ApiProperty()
   @IsNumber()
   id_nguoi_dung: number;
}

export class UpdateCongViecDTO {

   @ApiPropertyOptional()
   @IsString()
   ten_cong_viec: string;

   @ApiPropertyOptional()
   @IsNumber()
   danh_gia: number;

   @ApiPropertyOptional()
   @IsNumber()
   gia_tien: number;

   @ApiPropertyOptional()
   @IsString()
   mo_ta: string;

   @ApiPropertyOptional()
   @IsString()
   mo_ta_ngan: string;

   @ApiPropertyOptional()
   @IsNumber()
   sao_cong_viec: number;

   @ApiPropertyOptional()
   @IsNumber()
   id_loai_cong_viec: number;

   @ApiPropertyOptional()
   @IsNumber()
   id_nguoi_dung: number;
}