import { parseArgumentsExercise } from "./validateArgs";

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Calification {
    rating: number;
    ratingDescription: string;
    minValue: number;
    maxValue: number;
}

const califications: Calification[] = [
    {
        rating: 1,
        ratingDescription: "you have to try harder",
        minValue: 0,
        maxValue: 30,
    },
    {
        rating: 2,
        ratingDescription: "not too bad but could be better",
        minValue: 30,
        maxValue: 70,
    },
    {
        rating: 3,
        ratingDescription: "excellent you are really good",
        minValue: 70,
        maxValue: 100,
    },
];

const getCalification = (
    targetHours: number,
    weekExerciseHours: number[]
): Calification => {
    const targetAcquiredDays = weekExerciseHours.filter(
        (h) => h >= targetHours
    ).length;
    const periodLength = weekExerciseHours.length;
    let percentageCompletion = (targetAcquiredDays / periodLength) * 100;

    const calificationObtained = califications.find(
        (calification) =>
            percentageCompletion > calification.minValue &&
            percentageCompletion <= calification.maxValue
    );

    return calificationObtained;
};

const calculateExercises = (
    targetHours: number,
    weekExerciseHours: number[]
): Result => {
    const periodLength = weekExerciseHours.length;
    const trainingDays = weekExerciseHours.filter((h) => h > 0).length;
    const totalHours = weekExerciseHours.reduce(
        (curr, acc) => (acc += curr),
        0
    );
    const averageHours = totalHours / periodLength;

    const { rating, ratingDescription } = getCalification(
        targetHours,
        weekExerciseHours
    );

    const result: Result = {
        periodLength,
        trainingDays,
        success: averageHours >= targetHours,
        rating,
        ratingDescription,
        target: targetHours,
        average: averageHours,
    };

    return result;
};

try {
    // console.log(calculateExercises(1.5, [1, 2, 2, 3, 1.5, 3, 1]));
    const { targetHours, exerciseHours } = parseArgumentsExercise(process.argv);
    console.log(calculateExercises(targetHours, exerciseHours));
} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
