import { Request, Response } from 'express';
interface RequestParams {
    city: string;
}
export declare function getWeather(req: Request<null, null, null, RequestParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export {};
