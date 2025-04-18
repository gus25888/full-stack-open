import { isAxiosError } from "axios";
import { Visibility, Weather } from "./types";

export const narrowError = (error: unknown) => {
    let errorMessage = "Error found. See console for details";
    if (isAxiosError(error)) {
        console.log(error.status);
        console.log(error.response);
        errorMessage = error.response?.data;
    } else {
        console.error(error);
    }

    return errorMessage;
};

export const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};

export const isWeather = (param: string): param is Weather => {
    return Object.values(Weather)
        .map((v) => v.toString())
        .includes(param);
};

export const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error("Incorrect or missing weather: " + weather);
    }
    return weather;
};

export const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility)
        .map((v) => v.toString())
        .includes(param);
};

export const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error("Incorrect or missing visibility: " + visibility);
    }
    return visibility;
};
