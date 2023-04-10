import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Questionnaire } from '../../entity/questionnaire.entity';
import { QuestionRequestUpdateDto } from './question.update.dto';

export class QuestionnaireRequestUpdateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  date: Date;

  creator_user_id: string;

  @ValidateNested()
  @IsNotEmpty()
  questions: QuestionRequestUpdateDto[];

  static async fromDto(
    questionnaireRequestDto: QuestionnaireRequestUpdateDto,
  ): Promise<Questionnaire> {
    return await Questionnaire.create({
      ...questionnaireRequestDto,
    });
  }
}
