import { NextFunction, Request, Response } from "express"

const corsOptions = (_req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST')
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type')
    next()
}

export default corsOptions