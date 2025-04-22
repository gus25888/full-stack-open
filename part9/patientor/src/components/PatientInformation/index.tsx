import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient, Gender } from "../../types";
import patientService from "../../services/patients";

const PatientInformation = () => {
    const [patient, setPatient] = useState<Patient>();
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
    }, [patientId]);

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
            <br />
            <span>ssn: {patient.ssn}</span>
            <br />
            <span>occupation: {patient.occupation}</span>
        </div>
    );
};

export default PatientInformation;
