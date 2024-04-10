import express, { Request, Response } from "express";
import { cache } from "../middleware/cahce";
import { Period } from "../enums/period";

const router = express.Router();

// Get Alarms query for past day
router.get(
  "/daily",
  cache(Period.Daily), // Cache for daily alarms using default key
  async (req: Request, res: Response) => {
    // No need to fetch data here, the cache middleware handles it
    res.send({ msg: "Data retrieved from cache (or API if not found)" });
  }
);

// Get Alarms query for past week
router.get(
  "/weekly",
  cache(Period.Weekly), // Cache for weekly alarms using default key
  async (req: Request, res: Response) => {
    // No need to fetch data here, the cache middleware handles it
    res.send({ msg: "Data retrieved from cache (or API if not found)" });
  }
);

// Get Alarms query for past month
router.get(
  "/monthly",
  cache(Period.Monthly), // Cache for monthly alarms using default key
  async (req: Request, res: Response) => {
    // No need to fetch data here, the cache middleware handles it
    res.send({ msg: "Data retrieved from cache (or API if not found)" });
  }
);

// Get Alarms query for last day (with custom cache key)
router.get(
  "/last-day",
  cache(Period.Custom, "last-day"), // Cache for last day alarms with custom key
  async (req: Request, res: Response) => {
    // No need to fetch data here, the cache middleware handles it
    res.send({ msg: "Data retrieved from cache (or API if not found)" });
  }
);

// Get Alarms query for last week (with custom cache key)
router.get(
  "/last-week",
  cache(Period.Custom, "last-week"), // Cache for last week alarms with custom key
  async (req: Request, res: Response) => {
    // No need to fetch data here, the cache middleware handles it
    res.send({ msg: "Data retrieved from cache (or API if not found)" });
  }
);

// Get Alarms query for last month (with custom cache key)
router.get(
  "/last-month",
  cache(Period.Custom, "last-month"), // Cache for last month alarms with custom key
  async (req: Request, res: Response) => {
    // No need to fetch data here, the cache middleware handles it
    res.send({ msg: "Data retrieved from cache (or API if not found)" });
  }
);

export default router;
