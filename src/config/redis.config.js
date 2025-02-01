import Redis from "ioredis";
import { configDotenv } from "dotenv";

configDotenv();

export const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on('connect', () => {
    console.log('Connected to Redis Cloud!');
});

redisClient.on('error', (err) => {
    console.error("Redis error:", err);
});
