import { Module } from '@nestjs/common';
import { QuestionnairesController } from './questionnaires.controller';
import { QuestionnairesService } from './questionnaires.service';
import { questionnairesProviders } from './questionnaires.providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [QuestionnairesController],
  providers: [QuestionnairesService, ...questionnairesProviders],
})
export class QuestionnairesModule {}
