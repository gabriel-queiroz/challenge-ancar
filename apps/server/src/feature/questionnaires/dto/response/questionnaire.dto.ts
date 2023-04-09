import { Questionnaire } from '../../entity/questionnaire.entity';

export class QuestionnaireResponseDto {
  name: string;

  description: string;
  date: Date;

  creator_user_id: number;

  static fromEntity(questionnaire: Questionnaire) {
    const questionnaireDto = new QuestionnaireResponseDto();
    questionnaireDto.name = questionnaire.name;
    questionnaireDto.description = questionnaire.description;
    questionnaireDto.date = questionnaire.date;
    questionnaire.creator_user_id = questionnaire.creator_user_id;
  }
  static fromEntityList(questionnaires: Questionnaire[]) {
    return questionnaires.map((quest) =>
      QuestionnaireResponseDto.fromEntity(quest),
    );
  }
}
