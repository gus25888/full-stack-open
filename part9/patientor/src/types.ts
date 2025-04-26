export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export enum EntryType {
    HealthCheck = "HealthCheck",
    OccupationalHealthcare = "OccupationalHealthcare",
    Hospital = "Hospital",
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose["code"]>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

export enum HealthCheckRatingColor {
    "green" = 0,
    "yellow" = 1,
    "orange" = 2,
    "red" = 3,
}

interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare;
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: {
        date: string;
        criteria: string;
    };
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthCareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
    ? Omit<T, K>
    : never;

export type EntryFormValues = UnionOmit<Entry, "id">;
