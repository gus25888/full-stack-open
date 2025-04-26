import {
    Diagnose,
    EntryType,
    Gender,
    HealthCheckRating,
    NewBaseEntry,
    NewEntry,
    NewPatient,
} from "./types";

const toNewEntry = (object: unknown): NewEntry => {
    let newEntry: NewEntry;
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if (
        "date" in object &&
        "specialist" in object &&
        "description" in object &&
        "type" in object
    ) {
        const newBaseEntry: NewBaseEntry = {
            date: parseDate(object.date),
            specialist: parseStringValue("specialist", object.specialist),
            description: parseStringValue("description", object.description),
        };
        // Optional value
        if ("diagnosisCodes" in object) {
            newBaseEntry.diagnosisCodes = parseDiagnosisCodes(
                object.diagnosisCodes
            );
        }

        if (object.type === EntryType.HealthCheck) {
            if ("healthCheckRating" in object) {
                newEntry = {
                    type: object.type,
                    healthCheckRating: parseHealthCheckRating(
                        object.healthCheckRating
                    ),
                    ...newBaseEntry,
                };
                return newEntry;
            }
        } else if (object.type === EntryType.OccupationalHealthcare) {
            if ("employerName" in object) {
                newEntry = {
                    type: object.type,
                    employerName: parseStringValue(
                        "employerName",
                        object.employerName
                    ),
                    ...newBaseEntry,
                };
                // Optional value
                if ("sickLeave" in object) {
                    newEntry.sickLeave = parseSickLeave(object.sickLeave);
                }
                return newEntry;
            }
        } else if (object.type === EntryType.Hospital) {
            if ("discharge" in object) {
                newEntry = {
                    type: object.type,
                    discharge: parseDischarge(object.discharge),
                    ...newBaseEntry,
                };
                return newEntry;
            }
        }
    }
    throw new Error("Incorrect data: some fields are missing");
};

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

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating)
        .filter((k: string | number) => typeof k === "number")
        .includes(param);
};

const parseHealthCheckRating = (rating: unknown) => {
    if (!rating || typeof rating !== "number" || !isHealthCheckRating(rating)) {
        throw new Error(
            "healthCheckRating must be one of " +
                Object.values(HealthCheckRating)
        );
    }
    return rating;
};

const parseSickLeave = (
    object: unknown
): { startDate: string; endDate: string } => {
    if (!object || typeof object !== "object") {
        throw new Error("sickLeave must have startDate and endDate");
    }

    if ("startDate" in object && "endDate" in object) {
        const newSickLeave = {
            startDate: parseDate(object.startDate),
            endDate: parseDate(object.endDate),
        };
        return newSickLeave;
    }
    throw new Error("Incorrect data: some fields are missing in sickLeave");
};

const parseDischarge = (
    object: unknown
): { date: string; criteria: string } => {
    if (!object || typeof object !== "object") {
        throw new Error("discharge must have date and criteria");
    }

    if ("date" in object && "criteria" in object) {
        const newDischarge = {
            date: parseDate(object.date),
            criteria: parseStringValue("criteria", object.criteria),
        };
        return newDischarge;
    }
    throw new Error("Incorrect data: some fields are missing in sickLeave");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
    if (!object || typeof object !== "object" || !(object instanceof Array)) {
        return [] as Array<Diagnose["code"]>;
    }

    return object as Array<Diagnose["code"]>;
};

export { toNewPatient, toNewEntry };
