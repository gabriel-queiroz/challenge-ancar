import { Module } from '@nestjs/common';

import { UsersModule } from './feature/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './feature/users/user.entity';
import { AuthModule } from './feature/auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './feature/auth/validation.pipe';
import { QuestionnairesModule } from './feature/questionnaires/questionnaires.module';
import { Questionnaire } from './feature/questionnaires/entity/questionnaire.entity';
import { Question } from './feature/questionnaires/entity/question.entity';
import { Answer } from './feature/questionnaires/entity/answer.entity';
import { QuestionnaireUser } from './feature/questionnaires/entity/questionnaire.user.entity';
@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      protocol: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ancar',
      models: [User, Questionnaire, Question, Answer, QuestionnaireUser],
      define: {
        timestamps: false,
      },
    }),
    AuthModule,
    QuestionnairesModule,
  ],

  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
