import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient, Gender, Diagnose } from "../../types";
import patientService from "../../services/patients";
import Entries from "./Entries";
import AddEntriesForm from "../AddEntriesForm";
import Alert from "@mui/material/Alert/Alert";

interface Props {
    diagnosis: Diagnose[];
}
const PatientInformation = (props: Props) => {
    const [patient, setPatient] = useState<Patient>();
    const [error, setError] = useState<string>();
    const [refresh, setRefresh] = useState<boolean>(false);

    const params = useParams();
    const patientId: string | undefined =
        params instanceof Object ? params.id : undefined;

    useEffect(() => {
        const getPatient = async (id: string) =>
            await patientService.getOne(id);

        if (patientId && typeof patientId === "string") {
            void getPatient(patientId).then((data) => {
                setPatient(data);
            });
        }
    }, [patientId, refresh]);

    if (!patient) {
        return null;
    }
    return (
        <div>
            <h2>
                {patient.name}
                {patient.gender === Gender.Female ? (
                    <FemaleIcon />
                ) : patient.gender === Gender.Male ? (
                    <MaleIcon />
                ) : (
                    <QuestionMarkIcon />
                )}
            </h2>
            <span>ssn: {patient.ssn}</span>
            <br />
            <span>occupation: {patient.occupation}</span>
            {error && <Alert severity="error">{error}</Alert>}

            <AddEntriesForm
                patient={patient}
                setPatient={setPatient}
                setError={setError}
                diagnosis={props.diagnosis}
                setRefresh={setRefresh}
            />
            {patient.entries ? <Entries entries={patient.entries} /> : null}
        </div>
    );
};

export default PatientInformation;
