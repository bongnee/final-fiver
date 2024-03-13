import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { LoginMiddleware } from './shared/middlewares/validation/authValidation/login.middleware';
import { RegisterMiddleware } from './shared/middlewares/validation/authValidation/register.middleware';
import { EnvironmentConfigModule } from './infrastructure/config/environment/environment.module';
import { TokenAuthMiddleware } from './shared/middlewares/jwt/token.middleware';
import { RequestMethod } from '@nestjs/common';
import { UserMiddleware } from './shared/middlewares/validation/businessValidation/user.middleware';
import { JobMiddleware } from './shared/middlewares/validation/businessValidation/job.middleware';
import { HiringJobMiddleware } from './shared/middlewares/validation/businessValidation/hiringJob.middleware';
import { AuthUtilsModule } from './shared/utils/authUtils/authUtils.module';
import { BinhLuanMiddleware } from './shared/middlewares/validation/businessValidation/binhLuan.middleware';
@Module({
  imports: [PersistenceModule, AuthModule, EnvironmentConfigModule.register(), AuthUtilsModule],
})

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenAuthMiddleware).exclude(
      { path: 'auth/(login|register)', method: RequestMethod.POST },
      { path: 'user/check-existed-email', method: RequestMethod.POST },
      { path: 'job/get-list-jobs', method: RequestMethod.GET },
    ).forRoutes('*')
    consumer.apply(UserMiddleware).forRoutes({ path: 'user/update-user-information/:id', method: RequestMethod.PUT },
      { path: 'user/delete-user/:id', method: RequestMethod.DELETE },
      { path: 'user/change-password/:id', method: RequestMethod.PATCH })
    consumer.apply(HiringJobMiddleware).forRoutes(
      { path: 'hiring-job/get-hiring-job-detail/:id', method: RequestMethod.GET },
      { path: 'hiring-job/complete-hiring-job/:id', method: RequestMethod.POST },
      { path: 'hiring-job/update-hiring-job/:id', method: RequestMethod.PUT },
      { path: 'hiring-job/delete-hiring-job/:id', method: RequestMethod.DELETE }
    )
    consumer.apply(LoginMiddleware).forRoutes('auth/login')
    consumer.apply(RegisterMiddleware).forRoutes('auth/register')
    consumer.apply(JobMiddleware).forRoutes(
      { path: 'job/update-job-information/:id', method: RequestMethod.ALL },
      { path: 'job/delete-job/:id', method: RequestMethod.ALL },
    );
    consumer.apply(BinhLuanMiddleware).forRoutes({
      path: 'comment/get-comment-detail/:id', method: RequestMethod.GET
    }, {
      path: 'comment/edit-comment/:id', method: RequestMethod.PUT
    }, {
      path: 'comment/delete-comment/:id', method: RequestMethod.DELETE
    })
  }
}


