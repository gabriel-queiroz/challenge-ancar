import { Questionnaire } from './questionnaire.entity';
import {
  PrimaryKey,
  Table,
  Sequelize,
  Column,
  Default,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({
  tableName: 'questions',
})
export class Question extends Model {
  @PrimaryKey
  @Default(Sequelize.fn('gen_random_uuid'))
  @Column
  id: string;

  @Column
  description: string;

  @ForeignKey(() => Questionnaire)
  @Column
  questionnaire_id: string;

  @BelongsTo(() => Questionnaire)
  questionnaire: Questionnaire;
}
