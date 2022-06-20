import axios, { AxiosResponse } from 'axios'
import { IWeatherResponse } from 'types/weatherAPIResponse'
import { Request, Response } from 'express'

export async function getWeatherByIP(req: Request, res: Response) {
    const secretAPIkey = process.env.WEATHER_API_KEY
    const clientIPaddress = req.ip.split(':')[3]

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
        .then(data => {
            if (data.status >= 400) {
                return res.status(400).send(data.data)
            } else if (data.status === 200) {
                return res.status(200).send(data.data)
            }
        })
}