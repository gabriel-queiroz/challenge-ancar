import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UsersDto } from './dto/response/users.dto';
import { UserRequestDto } from './dto/request/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof User,
  ) {}

  async create(userCreateDto: UserRequestDto): Promise<UsersDto> {
    const user = await UserRequestDto.fromDto(userCreateDto);
    const userSaved = await user.save();
    return UsersDto.fromModel(userSaved);
  }

  async listAll(): Promise<UsersDto[]> {
    const users = await this.usersRepository.findAll();
    return UsersDto.fromModelList(users);
  }

  async findByCpf(cpf: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        cpf,
      },
    });
  }
}
