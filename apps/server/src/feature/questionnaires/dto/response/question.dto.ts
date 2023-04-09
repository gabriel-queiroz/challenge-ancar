import { Question } from '../../entity/question.entity';

export class QuestionResponseDto {
  description: string;

  static fromEntity(question: Question): QuestionResponseDto {
    const questionDto = new QuestionResponseDto();
    questionDto.description = question.description;
    return questionDto;
  }

  static fromEntityList(questions: Question[]): QuestionResponseDto[] {
    return questions.map((question) =>
      QuestionResponseDto.fromEntity(question),
    );
  }
}
