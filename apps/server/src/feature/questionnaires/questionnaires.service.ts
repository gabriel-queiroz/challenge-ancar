import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Questionnaire } from './entity/questionnaire.entity';
import { QuestionnaireRequestDto } from './dto/request/questionnaire.dto';
import { UsersService } from '../users/users.service';
import { Question } from './entity/question.entity';
import { QuestionnaireResponseDto } from './dto/response/questionnaire.dto';

@Injectable()
export class QuestionnairesService {
  constructor(
    @Inject('QUESTIONNAIRE_REPOSITORY')
    private questionnaireRepository: typeof Questionnaire,
    @Inject('QUESTION_REPOSITORY')
    private questionRepository: typeof Question,
    private usersService: UsersService,
  ) {}
  async getAll(): Promise<QuestionnaireResponseDto[]> {
    try {
      const questionnaires = await this.questionnaireRepository.findAll({
        include: [this.questionRepository],
      });
      return QuestionnaireResponseDto.fromEntityList(questionnaires);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async create(
    questionnaireRequestDto: QuestionnaireRequestDto,
    current_user_id: string,
  ): Promise<void> {
    try {
      const user = await this.usersService.findOne(
        questionnaireRequestDto.creator_user_id,
      );

      const questionnaire = await Questionnaire.create(
        {
          ...questionnaireRequestDto,
          creator_user_id: current_user_id,
        },
        {
          include: [this.questionRepository],
        },
      );
      questionnaire.user = user;
      await questionnaire.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
