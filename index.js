"use strict";
// import express, { NextFunction, Request, Response } from "express"
// import userRoutes from "./routes/userRoutes"
// import mongoose from "mongoose"
// import cors from "cors"
// import dotenv from "dotenv"
// import { redisClient } from "./utils/redisClient"
// dotenv.config()
// const app = express()
// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.use(cors(
//     { origin: "http://localhost:5173", credentials: true }
// ))
// app.use(express.static("dist"))
// app.use("/uploads", express.static("uploads"))
// app.use("/api", userRoutes)
// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.status(404).json({ message: "Route Not Found" })
// })
// mongoose.connect(process.env.MONGO_URL as string)
// const PORT = Number(process.env.PORT) || 5000;
// (async () => {
//     try {
//         await redisClient.set("testKey", "Hello Redis")
//         const value = await redisClient.get("users")
//         console.log("Retrieved from Redis:", value)
//     } catch (err) {
//         console.error("Redis Error:", err)
//     }
// })()
// mongoose.connection.once("open", () => {
//     console.log("MONGO CONNECTED")
//     app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
// })
// // console.log("Server running on http://localhost:5000")
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const redisClient_1 = require("./utils/redisClient");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("dist"));
app.use("/uploads", express_1.default.static("uploads"));
// Routes
app.use("/api", userRoutes_1.default);
// 404 Error Handling
app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not Found" });
});
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
const PORT = Number(process.env.PORT) || 5000;
// Connect to Redis
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient_1.redisClient.set("testKey", "Hello Redis");
        const value = yield redisClient_1.redisClient.get("testKey");
        console.log("✅ Retrieved from Redis:", value);
    }
    catch (err) {
        console.error("❌ Redis Connection Error:", err);
    }
}))();
// Start Server after MongoDB connects
mongoose_1.default.connection.once("open", () => {
    app.listen(PORT, () => console.log(`🚀 Server Running on port ${PORT}`));
});
