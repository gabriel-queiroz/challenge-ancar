import { Questionnaire } from '../../entity/questionnaire.entity';
import { QuestionRequestDto } from '../request/question.dto';
import { QuestionResponseDto } from './question.dto';

export class QuestionnaireResponseDto {
  id: string;
  name: string;

  description: string;
  date: Date;

  creator_user_id: string;

  questions: QuestionRequestDto[];

  static fromEntity(questionnaire: Questionnaire): QuestionnaireResponseDto {
    const questionnaireDto = new QuestionnaireResponseDto();
    questionnaireDto.id = questionnaire.id;
    questionnaireDto.name = questionnaire.name;
    questionnaireDto.description = questionnaire.description;
    questionnaireDto.date = questionnaire.date;
    questionnaireDto.creator_user_id = questionnaire.creator_user_id;
    questionnaireDto.questions = QuestionResponseDto.fromEntityList(
      questionnaire.questions,
    );
    return questionnaireDto;
  }
  static fromEntityList(
    questionnaires: Questionnaire[],
  ): QuestionnaireResponseDto[] {
    return questionnaires.map((questionnaire) =>
      QuestionnaireResponseDto.fromEntity(questionnaire),
    );
  }
}
