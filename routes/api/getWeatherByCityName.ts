import axios from 'axios'
import { Request, Response } from 'express'

interface RequestParams {
    city: string
}

export async function getWeatherByCityName(req: Request<null, null, null, RequestParams>, res: Response) {
    const { city } = req.query
    const secretAPIkey = process.env.WEATHER_API_KEY

    if (!city) {
        return res.status(400).send({ error: 'city is required!' })
    }

    if (!secretAPIkey) {
        throw new Error('WEATHER_API_KEY IS REQUIRED')
    }

     axios({
        method: 'GET',
        url: 'http://api.weatherapi.com/v1/current.json',
        params: {
            key: secretAPIkey,
            q: city
        }
    })
        .then(data => {
            return res.status(200).send(data.data)
        })
        .catch(error => {
            return res.status(400).send({
                error: error
            })
        })
}