import axios from 'axios'
import { Request, Response } from 'express'

export async function getWeatherByIP(req: Request, res: Response) {

    const secretAPIkey = process.env.WEATHER_API_KEY
    const clientIPaddress = req.headers['x-forwarded-for']


    if (!secretAPIkey) {
        throw new Error('WEATHER_API_KEY IS REQUIRED')
    }

    if(!clientIPaddress){
        return res.send({error: 'IP address error'})
    }

    await axios({
            url: 'http://api.weatherapi.com/v1/current.json',
            method: 'GET',
            params: {
                key: secretAPIkey,
                lang: 'ru',
                q: clientIPaddress
            }
        })
        .then(data => {
            return res.status(200).send(data.data)
        })
        .catch( _ => {
            return res.status(400).send({
                error: 'something wrong'
            })
        })
}