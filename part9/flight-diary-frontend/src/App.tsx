import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { getAllEntries, addEntry } from "./diaryServices";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";

import Entry from "./components/DiaryEntry";
import Notification from "./components/Notification";

function App() {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [message, setMessage] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newVisibility, setNewVisibility] = useState("");
    const [newWeather, setNewWeather] = useState("");
    const [newComment, setNewComment] = useState("");

    const handleError = useCallback((error: unknown) => {
        if (axios.isAxiosError(error)) {
            console.log(error.status);
            console.log(error.response);
            const errorMessage =
                error.response?.data || "Error found. See console for details";
            showErrorMessage(errorMessage);
        } else {
            console.error(error);
        }
    }, []);

    const showErrorMessage = (content: string) => {
        setMessage(content);
        setTimeout(() => {
            setMessage("");
        }, 2000);
    };

    useEffect(() => {
        getAllEntries()
            .then((data) => {
                setEntries(data);
            })
            .catch(handleError);
    }, [handleError]);

    const diaryEntryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        // TODO: Delete the type assertions of Visibility and Weather.
        const newDiaryEntry: NewDiaryEntry = {
            date: newDate,
            visibility: newVisibility as Visibility,
            weather: newWeather as Weather,
            comment: newComment,
        };
        addEntry(newDiaryEntry)
            .then((data) => {
                setEntries(entries.concat(data));
            })
            .catch(handleError);

        setNewDate("");
        setNewVisibility("");
        setNewWeather("");
        setNewComment("");
    };

    return (
        <>
            <div>
                <h1>Add New Entry</h1>
                <Notification message={message} />
                {
                    <form onSubmit={diaryEntryCreation}>
                        <span>date:</span>
                        <input
                            value={newDate}
                            onChange={(event) => setNewDate(event.target.value)}
                        />
                        <br />
                        <span>visibility:</span>
                        <input
                            value={newVisibility}
                            onChange={(event) =>
                                setNewVisibility(event.target.value)
                            }
                        />{" "}
                        <br />
                        <span>weather:</span>
                        <input
                            value={newWeather}
                            onChange={(event) =>
                                setNewWeather(event.target.value)
                            }
                        />
                        <br />
                        <span>comment:</span>
                        <input
                            value={newComment}
                            onChange={(event) =>
                                setNewComment(event.target.value)
                            }
                        />
                        <br />
                        <button type="submit">add</button>
                    </form>
                }
            </div>
            <div>
                <h1>Diary Entries</h1>
                {entries.map((entry) => (
                    <Entry key={entry.id} entry={entry} />
                ))}
            </div>
        </>
    );
}

export default App;
