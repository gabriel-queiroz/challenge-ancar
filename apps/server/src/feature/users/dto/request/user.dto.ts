import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user.entity';

export class UserRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  static async fromDto(userRequestDto: UserRequestDto): Promise<User> {
    return await User.create({
      ...userRequestDto,
    });
  }
}
