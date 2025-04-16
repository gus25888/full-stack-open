import { Gender, NewPatient } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if (
        "name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object
    ) {
        const newPatient: NewPatient = {
            name: parseStringValue("name", object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseStringValue("ssn", object.ssn),
            gender: parseGender(object.gender),
            occupation: parseStringValue("occupation", object.occupation),
        };
        return newPatient;
    }
    throw new Error("Incorrect data: some fields are missing");
};

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseStringValue = (
    variableName: string,
    variableValue: unknown
): string => {
    if (!variableValue || !isString(variableValue)) {
        throw new Error(`Incorrect or missing ${variableName}`);
    }

    return variableValue;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender)
        .map((v) => v.toString())
        .includes(param);
};

const parseGender = (Gender: unknown): Gender => {
    if (!Gender || !isString(Gender) || !isGender(Gender)) {
        throw new Error("Incorrect or missing Gender: " + Gender);
    }
    return Gender;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};

export default toNewPatient;
