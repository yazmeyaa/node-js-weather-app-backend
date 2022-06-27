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


    try {

        const responseFromAPI = await axios({
            url: 'http://api.weatherapi.com/v1/current.json',
            method: 'GET',
            params: {
                key: secretAPIkey,
                lang: 'ru',
                q: clientIPaddress
            }
        })


        if (responseFromAPI.status === 200) {
            return res.status(200).send(responseFromAPI.data)
        } else if (responseFromAPI.status > 400) {
            return res.status(400).send({error: 'Location not found'})
        }
        
    }


    catch (error) {
        return res.status(400).send({
            error: error
        })
    }
}