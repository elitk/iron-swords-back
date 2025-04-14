import { fetchData } from "../services/orefService";
import { Alarm, GetAlarmsInput } from "../types/alarm";
import { Period } from "../enums/period";


  export async function getAlarmsByPeriod(input: GetAlarmsInput): Promise<{ alarms: Alarm[] | undefined }> {
    try {
      if (input.period === Period.Custom) {
        const { startDate, endDate } = input; // now safe!
        const alarms = await fetchData(Period.Custom, { startDate, endDate });
        return { alarms };
      }
  
      // Here TypeScript knows it's not Period.Custom
      const alarms = await fetchData(input.period);
      return { alarms };
    } catch (err) {
      throw new Error("Failed to get Alarms");
    }
  }
  
