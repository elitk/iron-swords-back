import { Period } from "../enums/period";

export interface Alarm {
  data: string;
  date: string;
  time: string;
  alertDate: string;
  category: number;
  category_desc: string;
  matrix_id: number;
  rid: number;
}

export type GetAlarmsInput =
  | { period: Period.Custom; startDate: Date; endDate: Date }
  | { period: Exclude<Period, Period.Custom> };
