import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AnswerRequestDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID(undefined, { each: true })
  question_id: string;
}
