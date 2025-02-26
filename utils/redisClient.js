"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const redisClient = new ioredis_1.default({
    host: "127.0.0.1",
    port: 6379,
    retryStrategy: (times) => Math.min(1000 * Math.pow(2, times), 3600000),
    maxRetriesPerRequest: null,
});
exports.redisClient = redisClient;
redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("error", (err) => console.error("Redis connection error:", err));
