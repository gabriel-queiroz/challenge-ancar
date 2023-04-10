import { IsNotEmpty, IsString, IsUUID, isUUID } from 'class-validator';

export class QuestionRequestUpdateDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID(undefined, { each: true })
  id: string;
}
