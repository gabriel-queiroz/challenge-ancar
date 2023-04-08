import { Questionnaire } from './questionnaire.entity';

export const questionnairesProviders = [
  {
    provide: 'QUESTIONNAIRE_REPOSITORY',
    useValue: Questionnaire,
  },
];
