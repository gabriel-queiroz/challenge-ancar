import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  static async fromDto(userRequestDto: UserRequestDto): Promise<User> {
    return await User.create({
      ...userRequestDto,
    });
  }
}
