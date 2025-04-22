import { v1 as uuid } from "uuid";

import patientsData from "../data/patients";

import { NewPatient, Patient, PatientWithoutGvtId } from "../types";

const patients: Patient[] = patientsData;

const getPatients = (): PatientWithoutGvtId[] =>
    patients.map((patient) => {
        return {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation,
            entries: patient.entries,
        };
    });

const getOnePatient = (id: string): Patient | undefined =>
    patients.find((patient) => patient.id === id);

const addPatient = (newPatient: NewPatient) => {
    const patientAdded = { id: uuid(), entries: [], ...newPatient };
    patients.push(patientAdded);
    return patientAdded;
};

export default {
    addPatient,
    getOnePatient,
    getPatients,
};
