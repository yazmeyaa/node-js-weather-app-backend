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
exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
function getWeather(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { city } = req.query;
        const secretAPIkey = process.env.WEATHER_API_KEY;
        console.log(city);
        if (!city) {
            return res.status(400).send({ error: 'city is required!' });
        }
        if (!secretAPIkey) {
            throw new Error('WEATHER_API_KEY IS REQUIRED');
        }
        (0, axios_1.default)({
            method: 'GET',
            url: 'http://api.weatherapi.com/v1/current.json',
            params: {
                key: secretAPIkey,
                q: city
            }
        })
            .then(data => {
            return res.status(200).send(data.data);
        })
            .catch(error => {
            return res.status(400).send({
                error: error
            });
        });
    });
}
exports.getWeather = getWeather;
