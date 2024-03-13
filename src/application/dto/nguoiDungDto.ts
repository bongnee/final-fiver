import { IsString, IsNumber, IsArray, IsEmail, IsNotEmpty } from "class-validator";
import { Exclude } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger/dist";

export class NguoiDungDTO {

   id: number;
   ten: string;
   email: string

   password: string;

   @Exclude()
   dien_thoai: string;

   @Exclude()
   ngay_sinh: string;

   @Exclude()
   gioi_tinh: string;

   role: string;

   ky_nang: Array<string>;

   chung_chi: Array<string>;


}

export class CreateNguoiDungAdminDTO {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   ten: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   email: string

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   password: string;


   @ApiPropertyOptional()
   @IsString()
   @IsNotEmpty()
   role: string
}

export class UpdateNguoiDungDTO {
   @ApiPropertyOptional()
   @IsString()
   ten: string;

   @ApiPropertyOptional()
   @IsString()
   dien_thoai: string;

   @ApiPropertyOptional()
   @IsString()
   ngay_sinh: string;

   @ApiPropertyOptional()
   @IsString()
   gioi_tinh: string;

   @ApiPropertyOptional()
   @IsArray()
   ky_nang: Array<string>;

   @ApiPropertyOptional()
   @IsArray()
   chung_chi: Array<string>;
}

export class ChangePasswordDTO {
   @ApiProperty()
   password: string;
}



