import { Router } from 'express'
import { getForecast } from '../middlewares/api/getForecast'
import { getWeatherByCityName } from '../middlewares/api/getWeatherByCityName'
import { getWeatherByIP } from '../middlewares/api/getWeatherByIp'

const api = Router()

api.get('/get_weather_by_ip', getWeatherByIP)
api.get('/get_weather', getWeatherByCityName)
api.get('/get_forecast', getForecast)


export { api }