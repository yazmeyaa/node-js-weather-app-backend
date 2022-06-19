import express from 'express'
import { getWeather } from './routes/api/getWeather'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

async function start() {
    try {
        app.listen(PORT, () => {
            console.log('Server is started at port ', PORT)
        })
    }
    catch (error) {
        if (error) {
            throw error
        }
    }
}

app.use(express.json())
app.use(cors())

app.get('/api/get_weather', getWeather)

start();