import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Questionnaire } from './questionnaire.entity';
import { QuestionnaireRequestDto } from './dto/request/questionnaire.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class QuestionnairesService {
  constructor(
    @Inject('QUESTIONNAIRE_REPOSITORY')
    private questionnaireRepository: typeof Questionnaire,
    private usersService: UsersService,
  ) {}
  async getAll() {
    return this.questionnaireRepository.findAll();
  }
  async create(
    questionnaireRequestDto: QuestionnaireRequestDto,
    current_user_id: string,
  ): Promise<void> {
    try {
      const user = await this.usersService.findOne(
        questionnaireRequestDto.creator_user_id,
      );
      const questionnaire = await QuestionnaireRequestDto.fromDto({
        ...questionnaireRequestDto,
        creator_user_id: current_user_id,
      });
      questionnaire.user = user;
      await questionnaire.save();
    } catch (error) {
      console.log(error);
    }
  }
}
