import { useState, useEffect } from "react";

import { Diagnose } from "../../types";
import diagnosesService from "../../services/diagnoses";

interface PropsDiagnosis {
    diagnosisCodes?: Array<Diagnose["code"]>;
}

const DiagnosisList = (props: PropsDiagnosis) => {
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

    useEffect(() => {
        const fetchDiagnosesList = async () => {
            const diagnoses = await diagnosesService.getAll();
            setDiagnoses(diagnoses);
        };
        void fetchDiagnosesList();
    }, []);

    if (!props.diagnosisCodes) {
        return null;
    }

    const diagnosesWithDescription = props.diagnosisCodes.map(
        (diagnosisCode) => {
            const diagnosisFound = diagnoses.find(
                (diagnose) => diagnose.code === diagnosisCode
            );
            return {
                code: diagnosisCode,
                description: diagnosisFound?.name || "not found",
            };
        }
    );

    return (
        <>
            <ul>
                {diagnosesWithDescription.map((d) => (
                    <li key={d.code}>{`${d.code}: ${d.description}`}</li>
                ))}
            </ul>
        </>
    );
};

export default DiagnosisList;
