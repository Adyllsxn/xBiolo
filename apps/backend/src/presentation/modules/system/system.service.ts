import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import * as os from 'os';

@Injectable()
export class SystemService {
  constructor(private prisma: PrismaService) {}

  getSystemInfo() {
    const memoryUsage = process.memoryUsage().rss / 1024 / 1024;
    const uptime = process.uptime();

    return {
      application: 'Biolo API',
      version: '1.0.0',
      description: 'Catálogo digital com finalização no WhatsApp',
      environment: process.env.NODE_ENV ?? 'development',
      server: os.hostname(),
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(uptime / 86400)}d ${Math.floor((uptime % 86400) / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
      memoryUsage: `${memoryUsage.toFixed(2)} MB`,
      cpu: {
        cores: os.cpus().length,
        model: os.cpus()[0]?.model || 'Unknown',
        loadAverage: os.loadavg(),
      },
      platform: os.platform(),
      arch: os.arch(),
    };
  }

  async getHealth() {
    let dbHealthy = true;
    let dbError: string | null = null;

    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch (error) {
      dbHealthy = false;
      if (error instanceof Error) {
        dbError = error.message;
      } else {
        dbError = 'Unknown database error';
      }
    }

    const memoryUsage = process.memoryUsage().rss / 1024 / 1024;
    const uptime = process.uptime();

    const healthData = {
      status: dbHealthy ? 'Healthy' : 'Unhealthy',
      application: 'Biolo API',
      version: '1.0.0',
      environment: process.env.NODE_ENV ?? 'development',
      server: os.hostname(),
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(uptime / 86400)}d ${Math.floor((uptime % 86400) / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
      memoryUsage: `${memoryUsage.toFixed(2)} MB`,
      database: dbHealthy ? 'Connected' : 'Disconnected',
    };

    if (!dbHealthy) {
      return {
        ...healthData,
        dbError: dbError,
      };
    }

    return healthData;
  }
}
