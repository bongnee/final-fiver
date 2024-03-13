import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateLoaiCongViecDTO {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   ten_loai: string;
}
export class UpdateLoaiCongViecDTO {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   ten_loai: string;
}