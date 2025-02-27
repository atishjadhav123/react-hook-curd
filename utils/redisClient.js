"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisUrl = process.env.REDIS_URL || "127.0.0.1:6379";
if (!redisUrl) {
    console.error("❌ REDIS_URL is missing in .env file");
    process.exit(1);
}
const redisClient = new ioredis_1.default(redisUrl, {
    tls: {} // Required for secure connection (rediss://)
});
exports.redisClient = redisClient;
redisClient.on("connect", () => console.log("✅ Connected to Redis"));
redisClient.on("error", (err) => console.error("❌ Redis connection error:", err));
