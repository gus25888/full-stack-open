import {
    TextField,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    Button,
    SelectChangeEvent,
    Checkbox,
    FormHelperText,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import axios from "axios";

import { Diagnose, EntryFormValues, EntryType, Patient } from "../../types";
import patientService from "../../services/patients";
import ExtraFields from "./ExtraFields";
import { EMPTY_VALUE } from "../../constants";

interface Props {
    patient: Patient;
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
    setError: React.Dispatch<React.SetStateAction<string | undefined>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    diagnosis: Diagnose[];
}

interface EntryTypeOption {
    value: EntryType;
    label: string;
}

const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(
    (v) => ({
        value: v,
        label: v.toString(),
    })
);

const labelStyle = { marginTop: 10 };

const AddEntriesForm = (props: Props) => {
    const { patient, setPatient, setError, diagnosis, setRefresh } = props;

    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [type, setType] = useState<EntryType>(EntryType.HealthCheck);

    const [healthCheckRating, setHealthCheckRating] =
        useState<number>(EMPTY_VALUE);

    const [employerName, setEmployerName] = useState<string>("");
    const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
    const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");
    const [dischargeDate, setDischargeDate] = useState<string>("");
    const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

    const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if (typeof event.target.value === "string") {
            const value = event.target.value;
            const entryType = Object.values(EntryType).find(
                (g) => g.toString() === value
            );
            if (entryType) {
                setType(entryType);
            }
        }
    };

    const onDiagnosisCodeChange = (event: SelectChangeEvent<string[]>) => {
        event.preventDefault();
        const value = event.target.value;
        if (value instanceof Array) {
            setDiagnosisCodes(value);
        }
    };

    const onClean = () => {
        setDescription("");
        setDate("");
        setSpecialist("");
        setDiagnosisCodes([]);
        setType(EntryType.HealthCheck);
        setHealthCheckRating(EMPTY_VALUE);
        setEmployerName("");
        setSickLeaveStart("");
        setSickLeaveEnd("");
        setDischargeDate("");
        setDischargeCriteria("");
    };

    const submitNewEntry = async (
        values: EntryFormValues,
        patient: Patient,
        setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>,
        setError: React.Dispatch<React.SetStateAction<string | undefined>>
    ) => {
        try {
            setError("");
            const patientId = patient.id;
            const entry = await patientService.createEntry(values, patientId);
            patient.entries.concat(entry);
            setPatient(patient);
            setRefresh(true);
            onClean();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (
                    e?.response?.data &&
                    typeof e?.response?.data === "string"
                ) {
                    const message = e.response.data.replace(
                        "Something went wrong. Error: ",
                        ""
                    );
                    console.error(message);
                    setError(message);
                } else {
                    console.error("Unrecognized axios error");
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();

        if (
            type === EntryType.HealthCheck &&
            (typeof healthCheckRating === "undefined" ||
                (typeof healthCheckRating === "number" &&
                    healthCheckRating === -1))
        ) {
            setError("Health Check Rating is required");
            return;
        }

        const newEntry: EntryFormValues = {
            description,
            date,
            specialist,
            diagnosisCodes,
            type,
            healthCheckRating,
            employerName,
            sickLeave:
                sickLeaveStart && sickLeaveEnd
                    ? {
                          startDate: sickLeaveStart,
                          endDate: sickLeaveEnd,
                      }
                    : undefined,
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria,
            },
        };
        submitNewEntry(newEntry, patient, setPatient, setError);
    };

    if (!patient) {
        return null;
    }

    return (
        <div
            style={{
                marginTop: "1em",
                marginBottom: "4em",
                border: "1px dotted black",
                borderRadius: "4px",
                padding: "0.5em",
            }}
        >
            <form onSubmit={addEntry}>
                <InputLabel style={labelStyle}>Type</InputLabel>
                <Select
                    required
                    autoWidth
                    value={type}
                    onChange={onEntryTypeChange}
                >
                    {entryTypeOptions.map((option) => (
                        <MenuItem key={option.label} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
                <InputLabel style={labelStyle}>Date</InputLabel>
                <TextField
                    required
                    type="date"
                    placeholder="YYYY-MM-DD"
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <FormHelperText>Required</FormHelperText>

                <InputLabel style={labelStyle}>Description</InputLabel>
                <TextField
                    required
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <FormHelperText>Required</FormHelperText>

                <InputLabel style={labelStyle}>Specialist</InputLabel>
                <TextField
                    required
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <FormHelperText>Required</FormHelperText>

                <InputLabel style={labelStyle}>Diagnosis Codes</InputLabel>
                <Select
                    fullWidth
                    multiple
                    displayEmpty
                    value={diagnosisCodes}
                    onChange={onDiagnosisCodeChange}
                >
                    {diagnosis.map((option) => (
                        <MenuItem key={option.code} value={option.code}>
                            <Checkbox
                                checked={diagnosisCodes.includes(option.code)}
                            />
                            {`${option.code}: ${option.name}`}
                        </MenuItem>
                    ))}
                </Select>
                <ExtraFields
                    type={type}
                    healthCheckRating={healthCheckRating}
                    setHealthCheckRating={setHealthCheckRating}
                    dischargeDate={dischargeDate}
                    setDischargeDate={setDischargeDate}
                    dischargeCriteria={dischargeCriteria}
                    setDischargeCriteria={setDischargeCriteria}
                    employerName={employerName}
                    setEmployerName={setEmployerName}
                    sickLeaveStart={sickLeaveStart}
                    setSickLeaveStart={setSickLeaveStart}
                    sickLeaveEnd={sickLeaveEnd}
                    setSickLeaveEnd={setSickLeaveEnd}
                />

                <Grid style={{ marginTop: "2em" }}>
                    <Grid item>
                        <Button
                            color="info"
                            variant="contained"
                            style={{ float: "left" }}
                            type="button"
                            onClick={onClean}
                            endIcon={<Delete />}
                        >
                            Clean Form
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: "right",
                            }}
                            type="submit"
                            variant="contained"
                            color="success"
                            endIcon={<Add />}
                        >
                            Add Entry
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddEntriesForm;
