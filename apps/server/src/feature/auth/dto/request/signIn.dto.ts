import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInRequestDto {
  @IsString()
  @ApiProperty()
  cpf: string;

  @ApiProperty()
  @IsString()
  password: string;
}
