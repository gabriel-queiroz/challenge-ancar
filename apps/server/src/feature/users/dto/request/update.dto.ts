import { IsNotEmpty, IsString } from 'class-validator';

export class UserUpdateRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
