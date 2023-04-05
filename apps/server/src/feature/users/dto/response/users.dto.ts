import { User } from '../../user.entity';

export class UsersDto {
  id: string;
  name: string;
  cpf: string;

  static fromModel(user: User): UsersDto {
    const userDto = new UsersDto();
    userDto.id = user.id;
    userDto.name = user.name;
    userDto.cpf = user.cpf;
    return userDto;
  }

  static fromModelList(users: User[]): UsersDto[] {
    return users.map((user) => UsersDto.fromModel(user));
  }
}
