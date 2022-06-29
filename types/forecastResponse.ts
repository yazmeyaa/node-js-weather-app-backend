import { WeatherValuesType, ConditionType } from './currentResponse'


export type LocationType = {
    country: string,
    lat: number,
    localtime: string,
    localtime_epoch: number,
    lon: number
    name: string
    region: string
    tz_id: string
}

export type AVGDayValues = {
    maxtemp_c: number,
    maxtemp_f: number,
    mintemp_c: number,
    mintemp_f: number,
    avgtemp_c: number,
    avgtemp_f: number,
    maxwind_mph: number,
    maxwind_kph: number,
    totalprecip_mm: number,
    totalprecip_in: number,
    avgvis_km: number,
    avgvis_miles: number,
    avghumidity: number,
    daily_will_it_rain: number,
    daily_chance_of_rain: number,
    daily_will_it_snow: number,
    daily_chance_of_snow: number,
    condition: ConditionType,
    uv: number
}

export type AstroValues = {
    sunrise: string,
    sunset: string,
    moonrise: string,
    moonset: string,
    moon_phase: string,
    moon_illumination: string
}

export type ForecastByHours = {
    time_epoch: number,
        time: string,
        temp_c: number,
        temp_f: number,
        is_day: number,
        condition: ConditionType,
        wind_mph: number,
        wind_kph: number,
        wind_degree: number,
        wind_dir: windDirection,
        pressure_mb: number,
        pressure_in: number,
        precip_mm: number,
        precip_in: number,
        humidity: number,
        cloud: number,
        feelslike_c: number,
        feelslike_f: number,
        windchill_c: number,
        windchill_f: number,
        heatindex_c: number,
        heatindex_f: number,
        dewpoint_c: number,
        dewpoint_f: number,
        will_it_rain: number,
        chance_of_rain: number,
        will_it_snow: number,
        chance_of_snow: number,
        vis_km: number,
        vis_miles: number,
        gust_mph: number,
        gust_kph: number,
        uv: number
}

export type ForecastSignleDay = {
    date: string,
    date_epoch: number,
    day: AVGDayValues,
    astro: AstroValues,
    hour: Array<ForecastByHours>
}

export interface IForecastResponse {
    location: LocationType,
    current: WeatherValuesType,
    forecast: {
        forecastday: Array<ForecastSignleDay>
    }
}

type windDirection = 'n' | 'nne' | 'ne' | 'ene' | 'e' | 'ese' | 'se' | 'sse' | 's' | 'ssw' | 'sw' | 'wsw' | 'w' | 'wnw' | 'nw' | 'nnw'