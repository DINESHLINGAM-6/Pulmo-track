export interface HealthMetrics {
  heartRate: number;
  steps: number;
  oxygenSaturation: number;
  sleepHours: number;
}

export interface HealthConnectConfig {
  apiKey: string;
  deviceId: string;
}
