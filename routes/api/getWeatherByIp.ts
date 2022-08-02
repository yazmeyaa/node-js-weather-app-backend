import axios from 'axios'
import { Request, Response } from 'express'

function validateIPAddress(IP: string) {

    let isAddressValid = Boolean(true)

    if (typeof IP !== 'string') {
        console.error('Wrong IP data type.', IP)
        return false
    }
    const IPsegments = IP.split('.')

    if (IPsegments.length !== 4) {
        isAddressValid = false
    }

    IPsegments.forEach(item => {
        const numToTest = parseInt(item)
        if (numToTest < 0 || numToTest > 255 || isNaN(numToTest)) {
            isAddressValid = false
        }
    })

    return isAddressValid
}

export async function getWeatherByIP(req: Request, res: Response) {

    const secretAPIkey = process.env.WEATHER_API_KEY
    const clientIPaddress = req.ip

    if(validateIPAddress(clientIPaddress) === false){
        return res.status(400).send({error: 'wrong ip address recieved'})
    }

    if (!secretAPIkey) {
        throw new Error('WEATHER_API_KEY IS REQUIRED')
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
        .catch(_ => {
            return res.status(400).send({
                error: 'something wrong'
            })
        })
}