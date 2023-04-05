import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto } from './dto/request/signIn.dto';
import { SignInResponseDto } from './dto/response/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInRequestDto: SignInRequestDto): Promise<SignInResponseDto> {
    try {
      const user = await this.usersService.findByCpf(signInRequestDto.cpf);
      console.log(user.password);
      console.log(signInRequestDto.password);
      console.log(user.validPassword(signInRequestDto.password));
      if (!!user && user.validPassword(signInRequestDto.password)) {
        const token = await this.jwtService.signAsync(user.toJSON());
        return {
          token,
        };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('unathorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
