import axios from 'axios'
import { Request, Response } from 'express'

interface RequestParams {
    city: string
}

export async function getWeatherByCityName(req: Request<null, null, null, RequestParams>, res: Response) {
    const secretAPIkey = process.env.WEATHER_API_KEY
    const { city } = req.query

    if (!city) {
        return res.status(400).send({ error: 'city is required!' })
    }

    if (!secretAPIkey) {
        throw new Error('WEATHER_API_KEY IS REQUIRED')
    }

    await axios({
        method: 'GET',
        url: 'http://api.weatherapi.com/v1/current.json',
        params: {
            key: secretAPIkey,
            lang: 'ru',
            q: city
        }
    })
    .then ( data => {
        return res.status(200).send(data.data)
    })
    .catch( _ => {
        return res.status(400).send({
            error: 'Something wrong'
        })
    })
   
}