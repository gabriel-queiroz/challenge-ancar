import { Type } from 'class-transformer';
import { IsString, IsDate, IsUUID, IsNotEmpty } from 'class-validator';
import { Questionnaire } from '../../questionnaire.entity';

export class QuestionnaireRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  date: Date;

  creator_user_id: string;

  static async fromDto(
    questionnaireRequestDto: QuestionnaireRequestDto,
  ): Promise<Questionnaire> {
    return await Questionnaire.create({
      ...questionnaireRequestDto,
    });
  }
}
