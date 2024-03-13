import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from '../../usecase/authController/auth.controller';
import { PrismaModule } from '../config/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({
    global: true
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
