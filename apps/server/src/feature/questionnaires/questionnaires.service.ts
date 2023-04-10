import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Questionnaire } from './entity/questionnaire.entity';
import { QuestionnaireRequestDto } from './dto/request/questionnaire.dto';
import { UsersService } from '../users/users.service';
import { Question } from './entity/question.entity';
import { QuestionnaireResponseDto } from './dto/response/questionnaire.dto';
import { QuestionnaireRequestUpdateDto } from './dto/request/questionnaire.update.dto';
import { Answer } from './entity/answer.entity';
import { AnswerRequestDto } from './dto/request/answer.dto';
import { QuestionnaireUser } from './entity/questionnaire.user.entity';

@Injectable()
export class QuestionnairesService {
  constructor(
    @Inject('QUESTIONNAIRE_REPOSITORY')
    private questionnaireRepository: typeof Questionnaire,
    @Inject('ANSWER_REPOSITORY')
    private answerRepository: typeof Answer,
    @Inject('QUESTIONNAIRE_USER_REPOSITORY')
    private questionnaireUserRepository: typeof QuestionnaireUser,
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

  async deleteById(id: string): Promise<void> {
    try {
      await this.questionnaireRepository.destroy({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateById(
    id: string,
    questionnaire: QuestionnaireRequestUpdateDto,
  ): Promise<void> {
    const transaction =
      await this.questionnaireRepository.sequelize.transaction();
    try {
      const result = await this.questionnaireRepository.findByPk(id);
      result.questions = questionnaire.questions.map((q) =>
        Question.build(
          { id: q.id, description: q.description },
          {
            isNewRecord: true,
          },
        ),
      );
      const questions = questionnaire.questions.map((q) =>
        Question.build({ ...q }),
      );
      const allQuestions = await result.$get('questions');
      const questionToDelete = allQuestions.filter(
        (question) =>
          !questions.find((q) => q.description === question.description),
      );

      for (const question of questions) {
        if (!(await result.$has('questions', question))) {
          await result.$create('question', {
            description: question.description,
          });
        }
      }
      await Promise.all(questionToDelete.map((question) => question.destroy()));

      await this.questionnaireRepository.update(questionnaire, {
        where: { id },
      });
      transaction.commit();
    } catch (error) {
      transaction.rollback();
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(
    questionnaireRequestDto: QuestionnaireRequestDto,
    current_user_id: string,
  ): Promise<void> {
    const transaction =
      await this.questionnaireRepository.sequelize.transaction();
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
      transaction.commit();
    } catch (error) {
      transaction.rollback();
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createAnswers(
    questionnaireId: string,
    answers: AnswerRequestDto[],
    userId: string,
  ): Promise<void> {
    await Promise.all(answers.map((answer) => Answer.create({ ...answer })));
    await this.questionnaireUserRepository.create({
      questionnaire_id: questionnaireId,
      user_id: userId,
    });
  }

  async getAnswers(questionnaire_id: string) {
    return this.answerRepository.findAll();
  }
}
