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
        };
    });

const addPatient = (newPatient: NewPatient) => {
    const patientAdded = { id: uuid(), ...newPatient };
    patients.push(patientAdded);
    return patientAdded;
};

export default {
    addPatient,
    getPatients,
};
