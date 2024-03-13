import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentConfigService } from '../config/environment/environment.service';
import { AuthRepository } from 'src/application/repositories/auth/auth.repository';
@Injectable()
export class AuthService implements AuthRepository {
   constructor(private readonly prisma: PrismaService,
      private readonly jwtService: JwtService,
      private readonly configService: EnvironmentConfigService) {

   }
   async login(userLogin: AuthLoginDto) {
      const { email, password } = userLogin
      const user = await this.prisma.usePrisma().nguoi_dung.findFirst({
         where: {
            email
         }
      })
      if (user) {
         const isMatch = await bcrypt.compare(password, user.password)
         if (isMatch) {
            const accessToken = await this.jwtService.signAsync({ data: user }, { expiresIn: "10h", secret: this.configService.getJwtSecret() })
            const data = this.jwtService.decode(accessToken)
            return {
               accessToken: accessToken,
               decodedData: data
            }
         } else {
            return "Sai mật khẩu"
         }
      } else {
         return "Email không tồn tại"
      }
   }

   async register(userRegister: AuthRegisterDto) {
      const { email, password, ten, gioi_tinh } = userRegister
      const isUserExisted = await this.prisma.usePrisma().nguoi_dung.findFirst({
         where: {
            email
         }
      })
      if (isUserExisted) {
         return "Email đã tồn tại"
      } else {
         let hashPassword = await bcrypt.hash(password, 10)
         let newUser = {
            email,
            password: hashPassword,
            ten,
            gioi_tinh,
            role: 'User'
         }
         await this.prisma.create('nguoi_dung', newUser)
      }
   }
}
