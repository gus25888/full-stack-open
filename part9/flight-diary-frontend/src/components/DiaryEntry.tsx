import { DiaryEntry } from "../types";

interface EntryProps {
    entry: DiaryEntry;
}

const Entry = (props: EntryProps): React.JSX.Element => (
    <div>
        <h3>{props.entry.date}</h3>
        <span style={{ display: "block" }}>weather: {props.entry.weather}</span>
        <span style={{ display: "block" }}>
            visibility: {props.entry.visibility}
        </span>
        <span style={{ display: "block" }}>comment: {props.entry.comment}</span>
    </div>
);

export default Entry;
