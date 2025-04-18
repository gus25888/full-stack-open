import { useState, useEffect, useCallback } from "react";

import { getAllEntries } from "./services/diaryServices";
import { DiaryEntry } from "./types";

import Entry from "./components/DiaryEntry";
import Notification from "./components/Notification";
import FormDiaryEntry from "./components/FormDiaryEntry";
import { narrowError } from "./utils";

function App() {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [message, setMessage] = useState("");

    const handleError = useCallback(narrowError, []);

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
            .catch((error) => {
                showErrorMessage(handleError(error));
            });
    }, [handleError]);

    return (
        <>
            <div>
                <Notification message={message} />
                <FormDiaryEntry
                    entries={entries}
                    setEntries={setEntries}
                    showErrorMessage={showErrorMessage}
                />
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
