import { UserRequestDto } from './dto/request/user.dto';
import { UsersDto } from './dto/response/users.dto';
import { UsersService } from './users.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(): Promise<UsersDto[]> {
    return this.usersService.listAll();
  }

  @Post()
  async create(@Body() userRequestDto: UserRequestDto): Promise<UsersDto> {
    return this.usersService.create(userRequestDto);
  }
}
