import { IsNotEmpty, IsString } from 'class-validator';

export class QuestionRequestDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
