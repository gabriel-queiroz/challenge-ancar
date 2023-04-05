import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './feature/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './feature/users/user.entity';
import { AuthModule } from './feature/auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './feature/auth/validation.pipe';
@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ancar',
      models: [User],
      define: {
        timestamps: false,
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
