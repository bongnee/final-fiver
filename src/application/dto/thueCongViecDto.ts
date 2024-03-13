import { IsNumber, IsNotEmpty, IsBoolean } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateThueCongViecDTO {
   @ApiProperty()
   @IsNotEmpty()
   @IsNumber()
   id_cong_viec: number;

   @ApiProperty()
   @IsNotEmpty()
   @IsNumber()
   id_nguoi_thue: number;


   ngay_thue: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsBoolean()
   hoan_thanh: boolean
}

export class UpdateThueCongViecDTO {
   @ApiProperty()
   @IsNotEmpty()
   @IsNumber()
   id_cong_viec: number;

   @ApiProperty()
   @IsNotEmpty()
   @IsNumber()
   id_nguoi_thue: number;

   @ApiPropertyOptional()
   ngay_thue: Date;

   @ApiProperty()
   @IsNotEmpty()
   @IsBoolean()
   hoan_thanh: boolean
}