import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Company } from 'src/company/company.entity';

export interface IAuth {
  id: number;
  email: string;
  password: string;
  nickname: string;
  avatarUrl: string;
  isAdmin: boolean;
  refreshToken: string | null;
}

@Table({
  tableName: 'user',
})
export class Auth extends Model<Auth, IAuth> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nickname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue:
      'https://res.cloudinary.com/dzuxudptr/image/upload/v1707008957/cbwum9pyene3t5viks3z.jpg',
  })
  avatarUrl: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isAdmin: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  refreshToken: string | null;

  @HasMany(() => Company, { onDelete: 'CASCADE', foreignKey: 'userId' })
  company: Company;
}
