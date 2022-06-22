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
exports.getWeatherByCityName = void 0;
const axios_1 = __importDefault(require("axios"));
function getWeatherByCityName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const secretAPIkey = process.env.WEATHER_API_KEY;
        const { city } = req.query;
        if (!city) {
            return res.status(400).send({ error: 'city is required!' });
        }
        if (!secretAPIkey) {
            throw new Error('WEATHER_API_KEY IS REQUIRED');
        }
        const response = yield (0, axios_1.default)({
            method: 'GET',
            url: 'http://api.weatherapi.com/v1/current.json',
            params: {
                key: secretAPIkey,
                q: city
            }
        });
        if (response.status >= 400) {
            return res.status(400).send(response.data);
        }
        else if (response.status === 200) {
            return res.status(200).send(response.data);
        }
    });
}
exports.getWeatherByCityName = getWeatherByCityName;
