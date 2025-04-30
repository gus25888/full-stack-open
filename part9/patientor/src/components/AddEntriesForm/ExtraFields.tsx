import {
    InputLabel,
    FormHelperText,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
    HealthCheckRating,
    EntryType,
    HealthCheckRatingColor,
} from "../../types";
import { assertNever } from "../../utils";
import { EMPTY_VALUE } from "../../constants";

interface ExtraFieldsProps {
    type: EntryType;
    healthCheckRating: number;
    setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>;
    dischargeDate: string;
    setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
    dischargeCriteria: string;
    setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
    employerName: string;
    setEmployerName: React.Dispatch<React.SetStateAction<string>>;
    sickLeaveStart: string;
    setSickLeaveStart: React.Dispatch<React.SetStateAction<string>>;
    sickLeaveEnd: string;
    setSickLeaveEnd: React.Dispatch<React.SetStateAction<string>>;
}

interface HealthCheckRatingOption {
    value: HealthCheckRating;
    label: string;
}

const labelStyle = { marginTop: 10 };
const radioLabelStyle = {
    marginTop: 10,
    marginRight: "2em",
    marginLeft: "-0.75em",
};

const ExtraFields = (props: ExtraFieldsProps) => {
    const {
        type,
        healthCheckRating,
        setHealthCheckRating,
        dischargeDate,
        setDischargeDate,
        dischargeCriteria,
        setDischargeCriteria,
        employerName,
        setEmployerName,
        sickLeaveStart,
        setSickLeaveStart,
        sickLeaveEnd,
        setSickLeaveEnd,
    } = props;

    const onHealthCheckRatingChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (
            event.target.value &&
            typeof event.target.value === "string" &&
            !isNaN(Number(event.target.value))
        ) {
            const val = Number(event.target.value);
            setHealthCheckRating(val);
        }
    };

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
        generateRatingOptions(healthCheckRatingValues, healthCheckRatingLabels);

    switch (type) {
        case EntryType.HealthCheck:
            return (
                <>
                    <InputLabel style={labelStyle}>
                        Health Check Rating
                    </InputLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        aria-required
                        value={healthCheckRating}
                        onChange={onHealthCheckRatingChange}
                    >
                        <>
                            <FormControlLabel
                                key={"Not Selected"}
                                value={EMPTY_VALUE}
                                control={<Radio />}
                                label={""}
                            />
                            <label
                                key={"label_not_selected"}
                                htmlFor={"Not Selected"}
                                style={radioLabelStyle}
                            >
                                {"Not Selected"}
                            </label>
                        </>
                        {healthCheckRatingOptions.map((option) => (
                            <>
                                <FormControlLabel
                                    key={option.label}
                                    value={option.value}
                                    control={<Radio />}
                                    label={
                                        <FavoriteIcon
                                            htmlColor={
                                                HealthCheckRatingColor[
                                                    option.value
                                                ]
                                            }
                                            titleAccess={
                                                HealthCheckRating[option.value]
                                            }
                                        />
                                    }
                                    style={{ marginLeft: "1em" }}
                                />
                                <label
                                    key={`label_${option.label}`}
                                    htmlFor={option.label}
                                    style={radioLabelStyle}
                                >
                                    {option.label}
                                </label>
                            </>
                        ))}
                    </RadioGroup>
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
                    <InputLabel style={labelStyle}>Discharge Date</InputLabel>
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
                    <InputLabel style={labelStyle}>Employer Name</InputLabel>
                    <TextField
                        required
                        fullWidth
                        value={employerName}
                        onChange={({ target }) => setEmployerName(target.value)}
                    />
                    <FormHelperText>Required</FormHelperText>

                    <InputLabel style={labelStyle}>Sick Leave Start</InputLabel>
                    <TextField
                        type="date"
                        placeholder="YYYY-MM-DD"
                        value={sickLeaveStart}
                        onChange={({ target }) =>
                            setSickLeaveStart(target.value)
                        }
                    />

                    <InputLabel style={labelStyle}>Sick Leave End</InputLabel>
                    <TextField
                        type="date"
                        placeholder="YYYY-MM-DD"
                        value={sickLeaveEnd}
                        onChange={({ target }) => setSickLeaveEnd(target.value)}
                    />
                </>
            );
        default:
            return assertNever(type);
    }
};

export default ExtraFields;
