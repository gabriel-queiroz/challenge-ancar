import {
  PrimaryKey,
  Table,
  Sequelize,
  Column,
  Default,
  ForeignKey,
  BelongsTo,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';
import { IsUUID } from 'class-validator';
import { Question } from './question.entity';

@Table({
  tableName: 'questionnaires',
})
export class Questionnaire extends Model {
  @PrimaryKey
  @Default(Sequelize.fn('gen_random_uuid'))
  @Column
  id: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  date: Date;

  @ForeignKey(() => User)
  @Column
  @IsUUID(4)
  creator_user_id: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Question)
  questions: Question[];
}
