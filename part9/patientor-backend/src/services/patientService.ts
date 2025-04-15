import patientsData from "../data/patients";

import { Patient, PatientWithoutGvtId } from "../types";

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

export default {
    getPatients,
};
