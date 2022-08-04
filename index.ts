import express from 'express'
import dotenv from 'dotenv'
import corsOptions from 'options/cors'
import { api } from './router/api'
import debug from 'utils/addPrefixToLog'

// Allows to config app with dotenv (.env file)
dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

async function start() {
    try {
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
app.use('api', api)

// start application
start();