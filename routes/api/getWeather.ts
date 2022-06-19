import axios from 'axios'
import { Request, Response } from 'express'

interface RequestParams {
    city: string
}

export async function getWeather(req: Request<null, null, null, RequestParams>, res: Response) {
    const { city } =  req.query
    const secretAPIkey = process.env.WEATHER_API_KEY

    console.log( city )

    if (!city) {
        return res.status(400).send({ error: 'city is required!' })
    }

    if (!secretAPIkey) {
        throw new Error('WEATHER_API_KEY IS REQUIRED')
    }

    const dataFromAPI = await axios({
        method: 'GET',
        url: 'http://api.weatherapi.com/v1/current.json',
        params: {
            key: secretAPIkey,
            q: city
        }
    })
    .catch(error => {
        return res.status(400).send({
            message: 'something wrong',
            error: error
        })
    })

    if (dataFromAPI.status > 400) {
        return res.status(400).send({ error: 'Wrong city name' })
    }

    console.log(dataFromAPI.data)

    return res.status(200).send(dataFromAPI.data)
}