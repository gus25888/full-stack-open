import { DiaryEntry } from "../types";

interface EntryProps {
    entry: DiaryEntry;
}

const spanStyle = { display: "block", margin: "0.25em", padding: "0.1em" };

const entryStyle = {
    border: "2px solid lightblue",
    padding: "0.1em",
    margin: "0.25em",
};
const Entry = (props: EntryProps): React.JSX.Element => (
    <div style={entryStyle}>
        <h3>{props.entry.date}</h3>
        <span style={spanStyle}>visibility: {props.entry.visibility}</span>
        <span style={spanStyle}>weather: {props.entry.weather}</span>
        <span style={spanStyle}>comment: {props.entry.comment}</span>
    </div>
);

export default Entry;
