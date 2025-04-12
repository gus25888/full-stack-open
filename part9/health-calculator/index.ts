import express from "express";

import { calculateBmi } from "./src/bmiCalculator";
import { calculateExercises } from "./src/exerciseCalculator";
import {
    parseQueryArgumentsBmi,
    parseBodyArgumentsExercises,
} from "./src/validateArgs";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    try {
        const { height, weight } = parseQueryArgumentsBmi(req.query);
        const result = calculateBmi(height, weight);
        res.json(result);
    } catch (error: unknown) {
        let errorMessage = "Something bad happened.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        console.error(errorMessage);
        res.status(400).json({
            error: "malformatted parameters",
        });
    }
});

app.post("/exercises", (req, res) => {
    try {
        const { targetHours, exerciseHours } = parseBodyArgumentsExercises(
            req.body
        );
        const result = calculateExercises(targetHours, exerciseHours);
        res.json(result);
    } catch (error: unknown) {
        let errorMessage: string = "";
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.error(errorMessage);
        res.status(400).json({
            error: errorMessage,
        });
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
