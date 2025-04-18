import { useState } from "react";

import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types";
import { addEntry } from "../services/diaryServices";
import {
    narrowError,
    parseDate,
    parseVisibility,
    parseWeather,
} from "../utils";

interface FormDiaryEntryProps {
    entries: DiaryEntry[];
    setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
    showErrorMessage: (content: string) => void;
}

const FormDiaryEntry = (props: FormDiaryEntryProps) => {
    const [newDate, setNewDate] = useState("");
    const [newVisibility, setNewVisibility] = useState("");
    const [newWeather, setNewWeather] = useState("");
    const [newComment, setNewComment] = useState("");

    const spanStyle = {
        display: "inline-block",
        fontWeight: "bold",
        marginRight: "0.25em",
        marginBottom: "0.5em",
    };

    const labelStyle = {
        display: "inline-block",
        marginRight: "0.25em",
    };
    const getRadioButtons = (
        type: "Visibility" | "Weather",
        setFn: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const typeToUse = type === "Visibility" ? Visibility : Weather;
        return (
            <fieldset style={{ display: "inline-block", border: "0" }}>
                {Object.values(typeToUse).map((t) => (
                    <label style={labelStyle} key={t}>
                        {t.toString()}
                        <input
                            type="radio"
                            name={type}
                            value={t}
                            onChange={() => {
                                setFn(t);
                            }}
                        />
                    </label>
                ))}
            </fieldset>
        );
    };

    const diaryEntryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();

        try {
            const newDiaryEntry: NewDiaryEntry = {
                date: parseDate(newDate),
                visibility: parseVisibility(newVisibility),
                weather: parseWeather(newWeather),
                comment: newComment,
            };

            addEntry(newDiaryEntry)
                .then((data) => {
                    props.setEntries(props.entries.concat(data));
                })
                .catch((error) => {
                    props.showErrorMessage(narrowError(error));
                });

            setNewDate("");
            setNewVisibility("");
            setNewWeather("");
            setNewComment("");

            document
                .querySelectorAll("input[type=radio]")
                .forEach((element) => {
                    if (element instanceof HTMLInputElement) {
                        element.checked = false;
                    }
                });
        } catch (error) {
            if (error instanceof Error) {
                props.showErrorMessage(error.message);
            }
        }
    };

    return (
        <>
            <h1>Add New Entry</h1>
            <form onSubmit={diaryEntryCreation}>
                <span style={spanStyle}>date:</span>
                <input
                    type="date"
                    value={newDate}
                    onChange={(event) => setNewDate(event.target.value)}
                />
                <br />
                <span style={spanStyle}>visibility:</span>
                {getRadioButtons("Visibility", setNewVisibility)}
                <br />
                <span style={spanStyle}>weather:</span>
                {getRadioButtons("Weather", setNewWeather)}
                <br />
                <span style={spanStyle}>comment:</span>
                <input
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                />
                <br />
                <button type="submit">add</button>
            </form>
        </>
    );
};

export default FormDiaryEntry;
