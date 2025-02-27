import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL || "127.0.0.1:6379";
if (!redisUrl) {
    console.error("❌ REDIS_URL is missing in .env file");
    process.exit(1);
}

const redisClient = new Redis(redisUrl, {
    tls: {} // Required for secure connection (rediss://)
});

redisClient.on("connect", () => console.log("✅ Connected to Redis"));
redisClient.on("error", (err) => console.error("❌ Redis connection error:", err));

export { redisClient };
