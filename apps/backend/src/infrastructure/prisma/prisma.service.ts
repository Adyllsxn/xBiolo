import 'dotenv/config';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({ adapter });
  }
  async onModuleInit() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await this.$queryRaw`SELECT 1`;
      Logger.log('Database connection established');
    } catch (error) {
      Logger.error('Database connection failed', error);
      throw error;
    }
  }
}
