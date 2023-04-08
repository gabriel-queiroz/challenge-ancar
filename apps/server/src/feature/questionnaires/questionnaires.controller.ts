import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionnaireRequestDto } from './dto/request/questionnaire.dto';
import { QuestionnairesService } from './questionnaires.service';

@ApiBearerAuth()
@ApiTags('questionnaires')
@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private questionnairesService: QuestionnairesService) {}

  @Get()
  async getAll() {
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
}
