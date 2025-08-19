// utils/battery.ts

export interface BatteryStatus {
  status: 'critical' | 'low' | 'good';
  color: string; // text color for icons or text
  bg: string; // background color for badges
}

/**
 * Returns battery status based on battery level (0 to 1)
 */
export function getBatteryStatus(level: number): BatteryStatus {
  if (level <= 0.1) {
    return {
      status: 'critical',
      color: 'text-red-600',
      bg: 'bg-red-100'
    };
  } else if (level <= 0.5) {
    return {
      status: 'low',
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    };
  } else {
    return {
      status: 'good',
      color: 'text-green-600',
      bg: 'bg-green-100'
    };
  }
}

/**
 * Optional: format timestamp for display
 */
export function formatTimestamp(ts: string): string {
  const date = new Date(ts);
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}
