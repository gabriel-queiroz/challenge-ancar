import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionnaireRequestDto } from './dto/request/questionnaire.dto';
import { QuestionnairesService } from './questionnaires.service';
import { QuestionnaireResponseDto } from './dto/response/questionnaire.dto';
import { QuestionnaireRequestUpdateDto } from './dto/request/questionnaire.update.dto';

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

  @Put(':id')
  deleteById(
    @Param('id') id: string,
    @Body() questionnaire: QuestionnaireRequestUpdateDto,
  ): Promise<void> {
    return this.questionnairesService.updateById(id, questionnaire);
  }

  @Delete(':id')
  updateById(@Param('id') id: string): Promise<void> {
    return this.questionnairesService.deleteById(id);
  }
}
