import axios, { AxiosResponse } from 'axios'
import { IWeatherResponse } from 'types/weatherAPIResponse'
import { Request, Response } from 'express'

export async function getWeatherByIP(req: Request, res: Response) {
    const secretAPIkey = process.env.WEATHER_API_KEY
    const clientIPaddress = req.headers['x-forwarded-for']

    if (!clientIPaddress) {
        return res.status(400).send({ error: 'Where is IP?' })
    }

    if (!secretAPIkey) {
        throw new Error('WEATHER_API_KEY IS REQUIRED')
    }

    axios({
        method: 'GET',
        url: 'http://api.weatherapi.com/v1/current.json',
        params: {
            key: secretAPIkey,
            q: clientIPaddress
        }
    })
    .then( data => {
        return res.status(200).send({message: `your IP is ${clientIPaddress}`})
    })
    .catch( error => {
        return res.status(200).send(error)
    })
}