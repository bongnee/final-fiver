import { Module } from '@nestjs/common';
import { AuthUtils } from './authUtils';

@Module({
   providers: [AuthUtils],
   exports: [AuthUtils],
})
export class AuthUtilsModule { }
