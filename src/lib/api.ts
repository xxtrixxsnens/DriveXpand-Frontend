import { VehicleStats, VehicleAnalysis, Achievement, Trip, SafetyEvent, DayValue, TimeBucket } from "../types/api";

// Simulate API delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const mockStats: VehicleStats = {
  total_km: 847,
  avg_speed: 48,
  total_drive_time_minutes: 990, // 16.5 hours
  trip_count: 23,
};

const mockWeekdayData: DayValue[] = [
  { day: "Mo", value: 2.5 },
  { day: "Di", value: 1.8 },
  { day: "Mi", value: 3.2 },
  { day: "Do", value: 2.1 },
  { day: "Fr", value: 4.5 },
  { day: "Sa", value: 1.2 },
  { day: "So", value: 0.8 },
];

const mockTimeOfDayData: TimeBucket[] = [
  { label: "Morgens (6-10)", value: 35 },
  { label: "Mittags (10-14)", value: 15 },
  { label: "Nachmittags (14-18)", value: 30 },
  { label: "Abends (18-22)", value: 20 },
];

const mockSafetyEvents: SafetyEvent[] = [
  {
    timestamp: new Date().toISOString(),
    type: 'HARD_BRAKE',
  }
];

const mockAnalysis: VehicleAnalysis = {
  weekday_usage: mockWeekdayData,
  time_of_day_usage: mockTimeOfDayData,
  safety_events: mockSafetyEvents,
};

const mockAchievements: Achievement[] = [
  { name: "1.000 km Club", achieved: true, progress_percent: 100 },
  { name: "Frühaufsteher", achieved: true, progress_percent: 100 },
  { name: "Sparfuchs", achieved: false, progress_percent: 50 },
];

const mockTrips: Trip[] = [
  {
    trip_id: "1",
    datum_uhrzeit_start: "2026-01-15 14:32",
    km: 38.5,
    dauer: "42 min",
    avg_speed: "55",
  },
  {
    trip_id: "2",
    datum_uhrzeit_start: "2026-01-15 09:15",
    km: 12.3,
    dauer: "18 min",
    avg_speed: "41",
    tag: "Arbeit",
  },
  {
    trip_id: "3",
    datum_uhrzeit_start: "2026-01-14 19:30",
    km: 5.2,
    dauer: "12 min",
    avg_speed: "26",
    tag: "Geburtstagsfeier",
  },
  {
    trip_id: "4",
    datum_uhrzeit_start: "2026-01-14 08:45",
    km: 12.3,
    dauer: "22 min",
    avg_speed: "34",
    tag: "Arbeit",
  },
];

export const getVehicleStats = async (): Promise<VehicleStats> => {
  await delay(300);
  return mockStats;
};

export const getVehicleAnalysis = async (): Promise<VehicleAnalysis> => {
  await delay(500);
  return mockAnalysis;
};

export const getAchievements = async (): Promise<Achievement[]> => {
  await delay(400);
  return mockAchievements;
};

export const getTrips = async (): Promise<Trip[]> => {
  await delay(600);
  return mockTrips;
};
