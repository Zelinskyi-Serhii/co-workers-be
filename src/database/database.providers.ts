import { Sequelize } from 'sequelize-typescript';
import pg from 'pg';
import 'dotenv/config';
import { Auth } from '../auth/auth.entity';

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
      sequelize.addModels([Auth]);

      await sequelize.sync({ alter: true });

      return sequelize;
    },
  },
];
