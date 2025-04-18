import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

const url = "http://localhost:3000/api/diaries";

export const getAllEntries = async () => {
    const response = await axios.get<DiaryEntry[]>(url);
    return response.data;
};

export const addEntry = async (newDiaryEntry: NewDiaryEntry) => {
    const response = await axios.post(url, newDiaryEntry);
    return response.data;
};
