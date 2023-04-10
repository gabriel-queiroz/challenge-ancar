import {
  PrimaryKey,
  Table,
  Sequelize,
  Column,
  Default,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { Question } from './question.entity';

@Table({
  tableName: 'answers',
})
export class Answer extends Model {
  @PrimaryKey
  @Default(Sequelize.fn('gen_random_uuid'))
  @Column
  id: string;

  @Column
  description: string;

  @ForeignKey(() => Question)
  @Column
  question_id: string;
}
