import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Auth } from '../auth/auth.entity';
import { Employee } from 'src/employee/employee.entity';

interface ICompany {
  id: number;
  userId: number;
  name: string;
  avatarUrl: string;
  ownedAt: string;
  ownerName: string;
  publicId: string | null;
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

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  publicId: string | null;

  @BelongsTo(() => Auth, { foreignKey: 'userId' })
  user: Auth;

  @HasMany(() => Employee, { onDelete: 'CASCADE', foreignKey: 'companyId' })
  employee: Employee;
}
