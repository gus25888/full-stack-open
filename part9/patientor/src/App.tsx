import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { Diagnose, Patient } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientInformation from "./components/PatientInformation";

const App = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [diagnosis, setDiagnosis] = useState<Diagnose[]>([]);

    useEffect(() => {
        const fetchPatientList = async () => {
            const patients = await patientService.getAll();
            setPatients(patients);
        };
        void fetchPatientList();
    }, []);

    useEffect(() => {
        const fetchDiagnoseList = async () => {
            const diagnosis = await diagnosisService.getAll();
            setDiagnosis(diagnosis);
        };
        void fetchDiagnoseList();
    }, []);

    return (
        <div className="App">
            <Router>
                <Container>
                    <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                        Patientor
                    </Typography>
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="primary"
                    >
                        Home
                    </Button>
                    <Divider hidden />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PatientListPage
                                    patients={patients}
                                    setPatients={setPatients}
                                />
                            }
                        />
                        <Route
                            path="/patients/:id"
                            element={
                                <PatientInformation diagnosis={diagnosis} />
                            }
                        />
                    </Routes>
                </Container>
            </Router>
        </div>
    );
};

export default App;
