"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    console.error("❌ REDIS_URL is missing in .env file");
    process.exit(1);
}
const redisClient = new ioredis_1.default(redisUrl, {
    tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
    }
});
exports.redisClient = redisClient;
redisClient.on("connect", () => console.log("✅ Connected to Redis"));
redisClient.on("error", (err) => console.error("❌ Redis connection error:", err));
// import Redis from "ioredis";
// import dotenv from "dotenv";
// dotenv.config();
// const redisClient = new Redis({
//     host: process.env.REDIS_HOST, // Use environment variables
//     port: Number(process.env.REDIS_PORT),
//     username: process.env.REDIS_USER, // If required by your provider
//     password: process.env.REDIS_PASSWORD,
//     tls: process.env.REDIS_TLS === "true" ? { rejectUnauthorized: false, minVersion: "TLSv1.2" } : undefined
// });
// redisClient.on("connect", () => console.log("✅ Connected to Redis"));
// redisClient.on("error", (err) => console.error("❌ Redis Connection Error:", err));
// export { redisClient };
