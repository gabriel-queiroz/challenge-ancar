import { SignInRequestDto } from './dto/request/signIn.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInResponseDto } from './dto/response/signIn.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOkResponse({
    description: 'The user records',
    type: SignInResponseDto,
  })
  async signIn(@Body() signInRequestDto: SignInRequestDto) {
    return this.authService.signIn(signInRequestDto);
  }
}
