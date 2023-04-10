import { PrimaryKey, Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'questionnaire_user',
})
export class QuestionnaireUser extends Model {
  @PrimaryKey
  @Column
  user_id: string;

  @PrimaryKey
  @Column
  questionnaire_id: string;

  @Column
  date: Date;
}
