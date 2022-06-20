import axios from 'axios'
import { Request, Response } from 'express'

export async function getWeatherByIP(req: Request, res: Response) {
    const secretAPIkey = process.env.WEATHER_API_KEY
    const clientIPaddress = req.ip.split(':')[1]

    console.log(clientIPaddress, secretAPIkey)

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
            return res.status(200).send(data.data)
        })
        .catch(error => {
            return res.status(400).send({
                error: error
            })
        })
}