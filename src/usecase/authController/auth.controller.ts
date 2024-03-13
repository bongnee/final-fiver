import { Controller, Res, Body } from '@nestjs/common';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Post } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto } from 'src/infrastructure/auth/auth.dto';
import { customResponse } from 'src/shared/response/customResponse';
import { HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('/login')
  async login(@Body() userLogin: AuthLoginDto, @Res() response: any) {
    try {
      let data = await this.authService.login(userLogin);
      if (typeof data === "object") {
        return response.send(data)
      } else {
        return response.send(customResponse(null, HttpStatus.UNAUTHORIZED, data))
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }
  @Post('/register')
  async register(@Body() userRegister: AuthRegisterDto, @Res() response: any) {
    try {
      let data = await this.authService.register(userRegister)
      if (typeof data !== "string") {
        return response.send(customResponse(null, HttpStatus.CREATED, "Đăng ký thành công"))
      } else {
        return response.send(customResponse(null, HttpStatus.CREATED, data))
      }
    } catch (error) {
      return customResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi Backend")
    }
  }
}
