import axios from 'axios'
import { Request, Response } from 'express'
import addPrefix from 'utils/addPrefixToLog'

interface RequestParams {
    city: string
}

export async function getWeatherByCityName(req: Request<null, null, null, RequestParams>, res: Response) {
    const secretAPIkey = process.env.WEATHER_API_KEY
    const { city } = req.query

    if (!city) {
        console.error(addPrefix('city is required'), city)
        return res.status(400).send({ error: 'city is required!' })
    }

    if (!secretAPIkey) {
        console.error(addPrefix('WEATHER_API_KEY IS REQUIRED'))
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
    .catch(responseError => {
        if (axios.isAxiosError(responseError)) {
            console.error(addPrefix(responseError.message))
            return res.status(400).send({
                error: 'something wrong',
                errorMessage: responseError.message
            })
        }
    })
   
}