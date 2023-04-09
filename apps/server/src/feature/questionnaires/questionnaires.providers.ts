import { Question } from './entity/question.entity';
import { Questionnaire } from './entity/questionnaire.entity';

export const questionnairesProviders = [
  {
    provide: 'QUESTIONNAIRE_REPOSITORY',
    useValue: Questionnaire,
  },
  {
    provide: 'QUESTION_REPOSITORY',
    useValue: Question,
  },
];
