export interface SystemHealth {
  status: string;
  application: string;
  version: string;
  environment: string;
  server: string;
  timestamp: string;
  uptime: string;
  memoryUsage: string;
  database: string;
}

export interface SystemInfo {
  application: string;
  version: string;
  description: string;
  environment: string;
  server: string;
  timestamp: string;
  uptime: string;
  memoryUsage: string;
  cpu: {
    cores: number;
    model: string;
    loadAverage: number[];
  };
  platform: string;
  arch: string;
}