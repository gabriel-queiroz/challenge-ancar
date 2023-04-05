import { UserUpdateRequestDto } from './dto/request/update.dto';
import { UserRequestDto } from './dto/request/user.dto';
import { UsersDto } from './dto/response/users.dto';
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';

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

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteById(id);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() userUpdateRequestDto: UserUpdateRequestDto,
  ): Promise<void> {
    return this.usersService.updateById(id, userUpdateRequestDto);
  }
}
