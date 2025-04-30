import {
    Entry,
    EntryType,
    HealthCheckRating,
    HealthCheckRatingColor,
} from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../../utils";

interface Props {
    entry: Entry;
}

const EntryDetails = (props: Props) => {
    if (!props.entry) {
        return null;
    }

    const entryDetailsStyle = {
        padding: "0.1em",
        margin: "0.1em",
    };

    const spanStyle = {
        display: "block",
    };

    let entryDetailsContent: JSX.Element;

    switch (props.entry.type) {
        case EntryType.HealthCheck:
            entryDetailsContent = (
                <div style={entryDetailsStyle}>
                    <FavoriteIcon
                        htmlColor={
                            HealthCheckRatingColor[
                                props.entry.healthCheckRating
                            ]
                        }
                        titleAccess={
                            HealthCheckRating[props.entry.healthCheckRating]
                        }
                    />
                </div>
            );
            break;
        case EntryType.Hospital:
            entryDetailsContent = (
                <div style={entryDetailsStyle}>
                    <span style={spanStyle}>
                        {`discharge date: ${props.entry.discharge.date}`}
                    </span>
                    <span style={spanStyle}>
                        {`discharge criteria: ${props.entry.discharge.criteria}`}
                    </span>
                </div>
            );
            break;
        case EntryType.OccupationalHealthcare:
            entryDetailsContent = (
                <div style={entryDetailsStyle}>
                    <span>{`Employer name: ${props.entry.employerName}`}</span>
                    {props.entry.sickLeave ? (
                        <>
                            <br />
                            <span
                                style={spanStyle}
                            >{`Sick Leave Start: ${props.entry.sickLeave?.startDate}`}</span>
                            <span
                                style={spanStyle}
                            >{`Sick Leave End: ${props.entry.sickLeave?.endDate}`}</span>
                        </>
                    ) : null}
                </div>
            );
            break;
        default:
            return assertNever(props.entry);
    }

    return entryDetailsContent;
};

export default EntryDetails;
