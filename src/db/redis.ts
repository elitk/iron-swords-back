// src/database/redis.ts
import { RedisClientType, createClient } from "redis";

export const connectRedis = async () => {
  const redisPort = 6379;
  const client2 = createClient({
    url: "redis://localhost:6379", // Replace with your Redis server URI
  });
  const client = createClient();
  client.on("ready", () => console.log("Redis is ready"));
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  console.log("Connected to Redis");
  return client;
};

export class RedisClient {
  private static instance: RedisClient;
  private client: RedisClientType;
  private isConnected: boolean = false;

  constructor(private url: string) {
    this.client = createClient({
      url: this.url,
    });
    this.client.on("connect", () => console.log("Connected to Redis"));
    this.client.on("error", (error) => console.error("Redis error", error));
  }

  public static getInstance(url: string): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient(url);
    }
    return RedisClient.instance;
  }

  public static checkInstance(url: string): RedisClient {
    if (!RedisClient.instance) {
      RedisClient;
      RedisClient.instance = new RedisClient(url);
    }
    return RedisClient.instance;
  }

  private async initializeConnection(): Promise<void> {
    if (!this.isConnected) {
      await this.client.connect();
    }
  }

  async connect(): Promise<void> {
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    await this.client.connect();
    console.log("Connected to Redis");
  }
  async disconnect(): Promise<void> {
    await this.client.disconnect();
    this.isConnected = false;

    console.log("Disconnected from Redis");
  }
  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }
  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }
}
