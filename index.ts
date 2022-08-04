import express from 'express'
import dotenv from 'dotenv'
import corsOptions from './middlewares/cors'
import { api } from './router/api'
import debug from './utils/addPrefixToLog'

// Allows to config app with dotenv (.env file)
dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

async function start() {
    try {
        if ( typeof process.env.WEATHER_API_KEY === 'undefined') {
            const errorMessage = 'WEATHER_API_KEY is required to run app. Add variable to process.env.'
            debug(errorMessage)
            throw new Error(errorMessage)
        }
        app.listen(PORT, () => {
            debug(`Server is started at port: ${PORT}`)
        })
    }
    catch (error) {
        if (error instanceof Error) {
            debug(error.message)
            throw error
        }
    }
}

// CORS config for application
app.use(corsOptions)

// parse request body
app.use(express.json())

// handle /api routes
app.use('/api', api)

// start application
start();