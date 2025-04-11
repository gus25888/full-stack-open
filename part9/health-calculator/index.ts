import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { parseQueryArgumentsBmi } from "./validateArgs";

const app = express();

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

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
