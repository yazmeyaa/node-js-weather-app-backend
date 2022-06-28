import axios from 'axios'
import { Request, Response } from 'express'
import { IForecastResponse } from 'types/forecastResponse'

export async function getForecast(req: Request<{ days: number, city: string }>, res: Response) {
    const { days, city } = req.query
    const secretAPIkey = process.env.WEATHER_API_KEY

    if (!secretAPIkey) {
        throw new Error('WEATHER_API_KEY IS REQUIRED')
    }

    if (!days || !city) {
        return res.status(400).send({
            error: 'missing required params'
        })
    }

    const responseFromAPI = await axios({
        url: 'http://api.weatherapi.com/v1/forecast.json',
        method: 'GET',
        params: {
            key: secretAPIkey,
            q: city,
            days: days
        }
    })

    if (responseFromAPI.status === 200) {
        return res.status(200).send(responseFromAPI.data)
    } else {
        return res.status(400).send(responseFromAPI.data)
    }

}