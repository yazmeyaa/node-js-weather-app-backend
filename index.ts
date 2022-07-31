import express, { NextFunction, Request, Response } from 'express'
import { getWeatherByCityName } from './routes/api/getWeatherByCityName'
import { getWeatherByIP } from './routes/api/getWeatherByIp'
import { getForecast } from './routes/api/getForecast'
import dotenv from 'dotenv'
import corsOptions from 'options/cors'

dotenv.config()


const app = express()
const PORT = process.env.PORT ?? 3000

async function start() {
    try {
        app.listen(PORT, () => {
            console.log('Server is started at port: ', PORT)
        })
    }
    catch (error) {
        if (error) {
            throw error
        }
    }
}

app.use(corsOptions)
app.use(express.json())

app.get('/api/get_weather', getWeatherByCityName)
app.get('/api/get_weather_by_ip', getWeatherByIP)
app.get('/api/get_forecast', getForecast)


start();