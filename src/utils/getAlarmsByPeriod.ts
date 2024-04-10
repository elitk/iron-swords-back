import {
  getCustomAlarms,
  getDailyAlarms,
  getMonthlyAlarms,
  getWeeklyAlarms,
} from "../controllers/alarms";
import { Period } from "../enums/period";
import { fetchData } from "../services/orefService";
import { Alarm } from "../types/alarm";

// Assuming your Oref API functions follow a similar pattern
export async function getAlarmsByPeriod(
  period: Period,
  comparePeriodNumber: number
): Promise<{ alarms: Alarm[] | undefined }> {
  switch (period) {
    case Period.Daily:
      return getDailyAlarms();
    case Period.Weekly:
      return getWeeklyAlarms();
    case Period.Monthly:
      return getMonthlyAlarms();
    case Period.Custom:
      return getCustomAlarms(comparePeriodNumber);
    default:
      throw new Error("Invalid period");
  }
}
