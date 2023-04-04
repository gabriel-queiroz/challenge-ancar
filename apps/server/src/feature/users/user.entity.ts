import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  Sequelize,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @PrimaryKey
  @Default(Sequelize.fn('gen_random_uuid'))
  @Column
  id: string;

  @Column
  name: string;

  @Column
  password: string;

  @Column
  cpf: string;
}
