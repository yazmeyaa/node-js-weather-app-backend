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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getWeatherByCityName_1 = require("./routes/api/getWeatherByCityName");
const getWeatherByIp_1 = require("./routes/api/getWeatherByIp");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
console.log(process.env.WEATHER_API_KEY);
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.listen(PORT, () => {
                console.log('Server is started at port ', PORT);
            });
        }
        catch (error) {
            if (error) {
                throw error;
            }
        }
    });
}
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/api/get_weather', getWeatherByCityName_1.getWeatherByCityName);
app.get('/api/get_weather_by_ip', getWeatherByIp_1.getWeatherByIP);
start();
