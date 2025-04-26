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

import patientService from "../../services/patients";
import {
    Diagnose,
    EntryFormValues,
    EntryType,
    HealthCheckRating,
    Patient,
} from "../../types";
import { assertNever } from "../../utils";

interface Props {
    patient: Patient;
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
    setError: React.Dispatch<React.SetStateAction<string | undefined>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    diagnosis: Diagnose[];
}

interface ExtraFieldsProps {
    type: EntryType;
}

interface EntryTypeOption {
    value: EntryType;
    label: string;
}

interface HealthCheckRatingOption {
    value: HealthCheckRating;
    label: string;
}

const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(
    (v) => ({
        value: v,
        label: v.toString(),
    })
);

// TODO: Revisar porque los inputs de texto "Extra" pierden el focus después de una letra.
// TODO: Revisar como poner valores neutros para los selects implementados (Health Check y Type).

const AddEntriesForm = (props: Props) => {
    const { patient, setPatient, setError, diagnosis, setRefresh } = props;

    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [type, setType] = useState<EntryType>(EntryType.HealthCheck);

    const [healthCheckRating, setHealthCheckRating] =
        useState<HealthCheckRating>(HealthCheckRating.Healthy);

    const [employerName, setEmployerName] = useState<string>("");
    const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
    const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");
    const [dischargeDate, setDischargeDate] = useState<string>("");
    const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

    const labelStyle = { marginTop: 10 };

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
    const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
        event.preventDefault();
        if (event.target.value && typeof event.target.value === "number") {
            setHealthCheckRating(event.target.value);
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
        setHealthCheckRating(HealthCheckRating.Healthy);
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
            setError(undefined);
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
        console.log({ diagnosisCodes });

        const newEntry: EntryFormValues = {
            description,
            date,
            specialist,
            diagnosisCodes,
            type,
            healthCheckRating,
            employerName,
            sickLeave: {
                startDate: sickLeaveStart,
                endDate: sickLeaveEnd,
            },
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria,
            },
        };
        submitNewEntry(newEntry, patient, setPatient, setError);
    };

    const ExtraFields = (props: ExtraFieldsProps) => {
        const generateRatingOptions = (values: number[], labels: string[]) => {
            const length = values.length;
            const result = [];
            for (let i = 0; i < length; i++) {
                result.push({
                    value: values[i],
                    label: labels[i],
                });
            }

            return result;
        };

        const healthCheckRatingValues: number[] = Object.values(
            HealthCheckRating
        ).filter((k: string | number) => typeof k === "number");

        const healthCheckRatingLabels: string[] = Object.values(
            HealthCheckRating
        ).filter((k: string | number) => typeof k === "string");

        const healthCheckRatingOptions: HealthCheckRatingOption[] =
            generateRatingOptions(
                healthCheckRatingValues,
                healthCheckRatingLabels
            );

        switch (props.type) {
            case EntryType.HealthCheck:
                return (
                    <>
                        <InputLabel style={labelStyle}>
                            Health Check Rating
                        </InputLabel>
                        <Select
                            required
                            value={healthCheckRating}
                            onChange={onHealthCheckRatingChange}
                        >
                            {healthCheckRatingOptions.map((option) => (
                                <MenuItem
                                    key={option.label}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </>
                );

            case EntryType.Hospital:
                return (
                    <>
                        <InputLabel style={labelStyle}>
                            Discharge Criteria
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            value={dischargeCriteria}
                            onChange={({ target }) =>
                                setDischargeCriteria(target.value)
                            }
                        />
                        <FormHelperText>Required</FormHelperText>
                        <InputLabel style={labelStyle}>
                            Discharge Date
                        </InputLabel>
                        <TextField
                            required
                            type="date"
                            placeholder="YYYY-MM-DD"
                            value={dischargeDate}
                            onChange={({ target }) =>
                                setDischargeDate(target.value)
                            }
                        />
                        <FormHelperText>Required</FormHelperText>
                    </>
                );

            case EntryType.OccupationalHealthcare:
                return (
                    <>
                        <InputLabel style={labelStyle}>
                            Employer Name
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            value={employerName}
                            onChange={({ target }) =>
                                setEmployerName(target.value)
                            }
                        />
                        <FormHelperText>Required</FormHelperText>

                        <InputLabel style={labelStyle}>
                            Sick Leave Start
                        </InputLabel>
                        <TextField
                            type="date"
                            placeholder="YYYY-MM-DD"
                            value={sickLeaveStart}
                            onChange={({ target }) =>
                                setSickLeaveStart(target.value)
                            }
                        />

                        <InputLabel style={labelStyle}>
                            Sick Leave End
                        </InputLabel>
                        <TextField
                            type="date"
                            placeholder="YYYY-MM-DD"
                            value={sickLeaveEnd}
                            onChange={({ target }) =>
                                setSickLeaveEnd(target.value)
                            }
                        />
                    </>
                );
            default:
                return assertNever(props.type);
        }
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
                    required
                    fullWidth
                    multiple
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
                <ExtraFields type={type} />

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
