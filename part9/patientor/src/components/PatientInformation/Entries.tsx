import { Entry } from "../../types";
import DiagnosisList from "./DiagnosisList";
import EntryDetails from "./EntryDetails";

interface Props {
    entries: Entry[];
}

const Entries = (props: Props) => {
    if (
        !props.entries ||
        (props.entries instanceof Array && props.entries.length === 0)
    ) {
        return null;
    }

    const entriesStyle = {
        border: "1px solid black",
        padding: "0.5em",
        margin: "0.5em",
    };
    return (
        <div>
            <h3>entries</h3>
            {props.entries.map((entry) => (
                <div key={entry.id} style={entriesStyle}>
                    <span>{entry.date}</span>
                    <br />
                    <span style={{ fontStyle: "italic" }}>
                        {entry.description}
                    </span>
                    <br />
                    <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
                    <br />
                    <EntryDetails entry={entry} />
                    <span>{`diagnosed by ${entry.specialist}`}</span>
                </div>
            ))}
        </div>
    );
};

export default Entries;
