import { SignInRequestDto } from './dto/request/signIn.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInResponseDto } from './dto/response/signIn.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';
@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @Public()
  @ApiOkResponse({
    description: 'The user records',
    type: SignInResponseDto,
  })
  async signIn(@Body() signInRequestDto: SignInRequestDto) {
    return this.authService.signIn(signInRequestDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
