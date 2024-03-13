import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateChiTietLoaiCongViecDTO {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   ten_chi_tiet: string;

   @ApiProperty()
   @IsNumber()
   @IsNotEmpty()
   id_loai: number
}

export class UpdateChiTietLoaiCongViecDTO {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   ten_chi_tiet: string;

   @ApiProperty()
   @IsNumber()
   @IsNotEmpty()
   id_loai: number
}