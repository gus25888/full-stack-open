import express from "express";
import patientService from "../services/patientService";
import { NewEntry, NewPatient } from "../types";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
    if (req.params.id && typeof req.params.id === "string") {
        const patientId = req.params.id;
        res.send(patientService.getOnePatient(patientId));
    } else {
        res.status(400).send("No patient found");
    }
});

router.post("/", (req, res) => {
    try {
        const newPatient: NewPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post("/:id/entries", (req, res) => {
    try {
        if (req.params.id && typeof req.params.id === "string") {
            const newEntry: NewEntry = toNewEntry(req.body);
            const patientId: string = req.params.id;
            const addedEntry = patientService.addEntry(newEntry, patientId);
            res.json(addedEntry);
        } else {
            res.status(400).send("No patient found");
        }
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
