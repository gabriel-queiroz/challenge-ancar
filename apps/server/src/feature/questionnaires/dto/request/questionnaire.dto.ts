import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Questionnaire } from '../../entity/questionnaire.entity';
import { QuestionRequestDto } from './question.dto';

export class QuestionnaireRequestDto {
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
  questions: QuestionRequestDto[];

  static async fromDto(
    questionnaireRequestDto: QuestionnaireRequestDto,
  ): Promise<Questionnaire> {
    return await Questionnaire.create({
      ...questionnaireRequestDto,
    });
  }
}
