import express from 'express'
import { getWeather } from './routes/api/getWeather'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

async function start() {
    try {
        app.listen(PORT, () => {
            console.log('Server is started at port ', PORT)
            console.log(process.env.WEATHER_API_KEY)
        })
    }
    catch (error) {
        if (error) {
            throw error
        }
    }
}

app.use(express.json())

app.get('/api/get_weather', getWeather)

start();