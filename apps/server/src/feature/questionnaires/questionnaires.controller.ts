import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionnaireRequestDto } from './dto/request/questionnaire.dto';
import { QuestionnairesService } from './questionnaires.service';
import { QuestionnaireResponseDto } from './dto/response/questionnaire.dto';

@ApiBearerAuth()
@ApiTags('questionnaires')
@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private questionnairesService: QuestionnairesService) {}

  @Get()
  async getAll(): Promise<QuestionnaireResponseDto[]> {
    return this.questionnairesService.getAll();
  }

  @Post()
  async create(
    @Body() questionnaireRequestDto: QuestionnaireRequestDto,
    @Req() request,
  ): Promise<void> {
    try {
      return this.questionnairesService.create(
        questionnaireRequestDto,
        request.user.id,
      );
    } catch (error) {
      console.log(error);
    }
  }
  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.questionnairesService.deleteById(id);
  }
}
