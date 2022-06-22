import { Request, Response } from 'express';
export declare function getWeatherByIP(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
