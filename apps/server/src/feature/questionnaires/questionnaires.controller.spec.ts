import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnairesController } from './questionnaires.controller';

describe('QuestionnaireController', () => {
  let controller: QuestionnairesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnairesController],
    }).compile();

    controller = module.get<QuestionnairesController>(QuestionnairesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
