"use strict";
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
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const redisClient_1 = require("./utils/redisClient");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.static("dist"));
app.use("/uploads", express_1.default.static("uploads"));
app.use("/api", userRoutes_1.default);
app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not Found" });
});
mongoose_1.default.connect(process.env.MONGO_URL);
const PORT = Number(process.env.PORT) || 5000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient_1.redisClient.set("testKey", "Hello Redis");
        const value = yield redisClient_1.redisClient.get("testKey");
        console.log("Retrieved from Redis:", value);
    }
    catch (err) {
        console.error("Redis Error:", err);
    }
}))();
mongoose_1.default.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
});
// console.log("Server running on http://localhost:5000")
