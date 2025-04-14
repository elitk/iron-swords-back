import { NextFunction, Request, Response } from "express";
import { RedisClient, connectRedis } from "../db/redis";
import { Period } from "../enums/period";
import { getAlarmsByPeriod } from "../utils/getAlarmsByPeriod";
import { GetAlarmsInput } from "../types/alarm";

type ComparePeriod = "last-day" | "last-week" | "last-month";

const getCompareRange = (comparePeriod?: ComparePeriod): { startDate: Date; endDate: Date } | undefined => {
  if (!comparePeriod) return undefined;

  const daysMap: Record<ComparePeriod, number> = {
    "last-day": 1,
    "last-week": 7,
    "last-month": 30,
  };

  const days = daysMap[comparePeriod];
  const now = new Date();
  const startDate = new Date(now);
  const endDate = new Date(now);

  startDate.setDate(now.getDate() - days);
  endDate.setDate(now.getDate() - days * 2);

  return { startDate, endDate };
};

export const cache = (period: Period, comparePeriod?: ComparePeriod) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const redisClient = await connectRedis();

      const range = period === Period.Custom && comparePeriod
        ? getCompareRange(comparePeriod)
        : undefined;

      const cacheKey = range
        ? `${comparePeriod}-${range.startDate.toISOString().split("T")[0]}`
        : `${period}-${new Date().toISOString().split("T")[0]}`;

      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("Using data from Redis cache");
        res.send({ alarms: JSON.parse(cachedData) });
        return;
      }

      console.log("Data not found in cache. Fetching from source...");
      const input: GetAlarmsInput = range
        ? { period: Period.Custom, startDate: range.startDate, endDate: range.endDate }
        : { period: period as Exclude<Period, Period.Custom> };
      const { alarms } = await getAlarmsByPeriod(input);

      await redisClient.setEx(cacheKey, 24 * 60 * 60, JSON.stringify(alarms));

      res.send({ alarms });
    } catch (error) {
      console.error("Error fetching/storing data:", error);
      next(error);
    }
  };
};
