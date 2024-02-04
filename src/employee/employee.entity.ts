import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Company } from '../company/company.entity';

interface IEmployee {
  id: number;
  companyId: number;
  firstname: string;
  lastname: string;
  position: string;
  hireDate: string;
  avatarUrl: string;
  birthday: string;
  isDismissed: boolean;
}

@Table({
  tableName: 'employee',
})
export class Employee extends Model<Employee, IEmployee> {
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
  companyId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  position: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hireDate: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  avatarUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  birthday: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDismissed: boolean;

  @BelongsTo(() => Company, { onDelete: 'CASCADE', foreignKey: 'companyId' })
  company: Company;
}
