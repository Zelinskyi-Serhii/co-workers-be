import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Auth } from '../auth/auth.entity';

interface ICompany {
  id: number;
  userId: number;
  name: string;
  avatarUrl: string;
  ownedAt: string;
  ownerName: string;
}

@Table({
  tableName: 'company',
})
export class Company extends Model<Company, ICompany> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  avatarUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ownedAt: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ownerName: string;

  @BelongsTo(() => Auth, { onDelete: 'CASCADE', foreignKey: 'userId' })
  user: Auth;
}
