import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from '../employee/employee.entity';

interface IReview {
  id: number;
  employeeId: number;
  review: string;
}

@Table({
  tableName: 'review',
  updatedAt: false,
})
export class Review extends Model<Review, IReview> {
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
  employeeId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  review: string;

  @BelongsTo(() => Employee, { onDelete: 'CASCADE', foreignKey: 'employeeId' })
  employee: Employee;
}
