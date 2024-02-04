import { Sequelize } from 'sequelize-typescript';
import pg from 'pg';
import 'dotenv/config';
import { Auth } from '../auth/auth.entity';
import { Company } from '../company/company.entity';

const { DATABASE_URL } = process.env;

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(DATABASE_URL, {
        dialectModule: pg,
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });
      sequelize.addModels([Auth, Company]);

      await sequelize.sync({ alter: false });

      return sequelize;
    },
  },
];
