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
exports.getWeatherByIP = void 0;
const axios_1 = __importDefault(require("axios"));
function getWeatherByIP(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const secretAPIkey = process.env.WEATHER_API_KEY;
        const clientIPaddress = req.headers['x-forwarded-for'];
        if (!secretAPIkey) {
            throw new Error('WEATHER_API_KEY IS REQUIRED');
        }
        try {
            const responseFromAPI = yield (0, axios_1.default)({
                url: 'http://api.weatherapi.com/v1/current.json',
                method: 'GET',
                params: {
                    key: secretAPIkey,
                    q: clientIPaddress
                }
            });
            if (responseFromAPI.status === 200) {
                return res.status(200).send(responseFromAPI.data);
            }
            else if (responseFromAPI.status > 400) {
                return res.status(400).send({ error: 'Location not found' });
            }
        }
        catch (error) {
            return res.status(400).send({
                error: error
            });
        }
    });
}
exports.getWeatherByIP = getWeatherByIP;
