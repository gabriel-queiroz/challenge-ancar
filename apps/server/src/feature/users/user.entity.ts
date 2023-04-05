import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  Sequelize,
  BeforeCreate,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 8;

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

  @BeforeCreate
  static cryptPassword(user: User) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(SALT_ROUNDS),
    );
    return user;
  }

  validPassword(password: string) {
    console.log(this.password);
    return bcrypt.compareSync(password, this.password);
  }
}
