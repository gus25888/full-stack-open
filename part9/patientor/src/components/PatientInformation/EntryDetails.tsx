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

    const entryDetailsClass = {
        padding: "0.1em",
        margin: "0.1em",
    };

    let entryDetailsContent: JSX.Element;

    switch (props.entry.type) {
        case EntryType.HealthCheck:
            entryDetailsContent = (
                <div style={entryDetailsClass}>
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
                <div style={entryDetailsClass}>
                    <span>{`discharge date: ${props.entry.discharge.date}`}</span>
                    <br />
                    <span>{`discharge criteria: ${props.entry.discharge.criteria}`}</span>
                </div>
            );
            break;
        case EntryType.OccupationalHealthcare:
            entryDetailsContent = (
                <div style={entryDetailsClass}>
                    <span>{`Employer name: ${props.entry.employerName}`}</span>
                    {props.entry.sickLeave ? (
                        <>
                            <br />
                            <span>{`Sick Leave Start: ${props.entry.sickLeave?.startDate}`}</span>
                            <br />
                            <span>{`Sick Leave End: ${props.entry.sickLeave?.endDate}`}</span>
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
