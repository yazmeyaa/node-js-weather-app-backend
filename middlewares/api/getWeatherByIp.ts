import axios from 'axios'
import { Request, Response } from 'express'
import debug from '../../utils/addPrefixToLog'

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
    const clientIPaddress = validateIPAddress(req.ip) === true ? req.ip : req.headers['x-forwarded-for'] as string

    if (validateIPAddress(clientIPaddress) === false) {
        debug(`wrong ip address recieved ${clientIPaddress}`)
        return res.status(400).send({ error: 'wrong ip address recieved' })
    }

    if (!secretAPIkey) {
        debug('WEATHER_API_KEY IS REQUIRED')
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
        .catch(responseError => {
            if (axios.isAxiosError(responseError)) {
                debug(responseError.message)
                return res.status(400).send({
                    error: 'something wrong',
                    errorMessage: responseError.message
                })
            }
        })
}