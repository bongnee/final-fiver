
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthLoginDto {
   @IsNotEmpty()
   @IsString()
   @ApiProperty()
   readonly email: string;

   @IsNotEmpty()
   @IsString()
   @ApiProperty()
   readonly password: string;
}

export class AuthRegisterDto {
   @IsNotEmpty()
   @IsString()
   @ApiProperty()
   readonly email: string

   @IsNotEmpty()
   @IsString()
   @ApiProperty()
   readonly password: string

   @IsString()
   @ApiProperty()
   readonly ten: string

   @IsString()
   @ApiProperty()
   readonly gioi_tinh: string

   readonly role: string | any
}