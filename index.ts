import express, {Request, Response} from 'express'
import { getWeatherByCityName } from './routes/api/getWeatherByCityName'
import { getWeatherByIP } from './routes/api/getWeatherByIp'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

console.log(process.env.WEATHER_API_KEY)

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

app.use(express.json())
app.use(cors())

app.get('/api/get_weather', getWeatherByCityName)
app.get('/api/get_weather_by_ip', getWeatherByIP)

app.get('/api/headers', (req: Request, res: Response) => {
    return res.status(200).send({
        headers: req.headers,
        ip: {
            reqIP: req.ip,
            reqSocketIP: req.socket.localAddress,
            header: req.headers['x-forwarded-for']
        }
    })
})

start();