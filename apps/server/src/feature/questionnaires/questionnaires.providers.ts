import { Answer } from './entity/answer.entity';
import { Question } from './entity/question.entity';
import { Questionnaire } from './entity/questionnaire.entity';
import { QuestionnaireUser } from './entity/questionnaire.user.entity';

export const questionnairesProviders = [
  {
    provide: 'QUESTIONNAIRE_REPOSITORY',
    useValue: Questionnaire,
  },
  {
    provide: 'QUESTION_REPOSITORY',
    useValue: Question,
  },
  {
    provide: 'ANSWER_REPOSITORY',
    useValue: Answer,
  },
  {
    provide: 'QUESTIONNAIRE_USER_REPOSITORY',
    useValue: QuestionnaireUser,
  },
];
