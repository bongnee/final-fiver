import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtRepository } from 'src/application/repositories/jwt/jwtRepositories';

@Injectable()
export class EnvironmentConfigService implements JwtRepository {
   constructor(private readonly config: ConfigService) {
   }
   getJwtSecret(): string {
      return this.config.get<string>('SECRET_KEY')
   }
}