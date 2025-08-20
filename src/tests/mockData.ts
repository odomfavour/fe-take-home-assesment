import type { DeviceData } from '@/types/device-data';

export const mockBatteryData: DeviceData[] = [
  {
    academyId: 30006,
    serialNumber: 'SN001',
    employeeId: 'EMP001',
    batteryLevel: 0.05, // critical
    timestamp: '2024-01-01T12:00:00Z'
  },
  {
    academyId: 30006,
    serialNumber: 'SN002',
    employeeId: 'EMP002',
    batteryLevel: 0.15, // low
    timestamp: '2024-01-02T12:00:00Z'
  },
  {
    academyId: 30006,
    serialNumber: 'SN003',
    employeeId: 'EMP003',
    batteryLevel: 0.8, // good
    timestamp: '2024-01-03T12:00:00Z'
  }
];
