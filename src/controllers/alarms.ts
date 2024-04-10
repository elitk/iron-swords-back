import { Period } from "../enums/period";
import { fetchData } from "../services/orefService";
import { Alarm } from "../types/alarm";

export async function getDailyAlarms(): Promise<{
  alarms: Alarm[] | undefined;
}> {
  try {
    const alarms = await fetchData(Period.Daily);
    if (!alarms) {
      return { alarms: undefined };
    }
    return { alarms };
  } catch (err) {
    throw new Error(`failed to get Alarms`);
  }
}

export async function getWeeklyAlarms(): Promise<{
  alarms: Alarm[] | undefined;
}> {
  try {
    const alarms = await fetchData(Period.Weekly);
    if (!alarms) {
      return { alarms: undefined };
    }
    return { alarms };
  } catch (err) {
    throw new Error(`failed to get Alarms`);
  }
}

export async function getMonthlyAlarms(): Promise<{
  alarms: Alarm[] | undefined;
}> {
  try {
    const alarms = await fetchData(Period.Monthly);
    if (!alarms) {
      return { alarms: undefined };
    }
    return { alarms };
  } catch (err) {
    throw new Error(`failed to get Alarms`);
  }
}
export async function getCustomAlarms(comparePeriodNumber: number): Promise<{
  alarms: Alarm[] | undefined;
}> {
  try {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() - comparePeriodNumber);
    endDate.setDate(endDate.getDate() - comparePeriodNumber * 2);

    const alarms = await fetchData(Period.Custom, { startDate, endDate });
    if (!alarms) {
      return { alarms: undefined };
    }
    return { alarms };
  } catch (err) {
    throw new Error(`failed to get Alarms`);
  }
}
