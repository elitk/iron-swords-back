import { NextFunction, Request, Response } from "express";
import { RedisClient, connectRedis } from "../db/redis";
import { Period } from "../enums/period";
import { getAlarmsByPeriod } from "../utils/getAlarmsByPeriod";

export const cache = (period: Period, comparePeriod?: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const redisClient = await connectRedis();
      let comparePeriodNumber;
      switch (comparePeriod) {
        case "last-day":
          comparePeriodNumber = 1;
          break;
        case "last-week":
          comparePeriodNumber = 7;
          break;
        case "last-month":
          comparePeriodNumber = 30;
          break;
        default:
          comparePeriodNumber = 0;
          break;
      }

      const date = new Date();
      const cacheDateKey = date.setDate(date.getDate() - comparePeriodNumber);
      const key = `${comparePeriod ? comparePeriod : period}-${new Date(
        cacheDateKey
      ).toLocaleDateString()}`;

      const cachedData = await redisClient.get(key);
      if (cachedData) {
        console.log("Using data from Redis cache");
        res.send({ alarms: JSON.parse(cachedData) });
        return; // Exit if data is found in cache
      }

      console.log("Data not found in cache. Fetching data from API.");
      // ... rest of the logic to fetch data based on period (assuming functions return alarms object)

      const { alarms } = await getAlarmsByPeriod(period, comparePeriodNumber); // Assuming a helper function for fetching data

      // Store data in Redis with a TTL (e.g., 24 hours)
      await redisClient.setEx(key, 24 * 60 * 60, JSON.stringify(alarms));

      // ... rest of the logic (optional data update)

      res.send({ alarms }); // Send fetched data
    } catch (error) {
      console.error("Error fetching or storing data:", error);
      next(error); // Pass error to error handling middleware
    } finally {
      // Connection is managed by the connectRedis helper function (assumed)
    }
  };
};
