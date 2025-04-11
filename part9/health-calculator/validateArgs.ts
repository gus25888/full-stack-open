interface BmiValues {
    height: number;
    weight: number;
}

interface ExerciseValues {
    exerciseHours: number[];
    targetHours: number;
}

export const parseArgumentsBmi = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
};

export const parseQueryArgumentsBmi = (args: any): BmiValues => {
    const { height, weight } = args;

    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        return {
            height: Number(height),
            weight: Number(weight),
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
};

export const parseArgumentsExercise = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error("Not enough arguments");

    if (isNaN(Number(args[2])))
        throw new Error("Provided targetHours value was not a number!");

    const exerciseHours: number[] = [];
    args.forEach((val, index) => {
        if (index > 2) {
            if (isNaN(Number(val))) {
                throw new Error("Provided values were not numbers!");
            } else {
                exerciseHours.push(Number(val));
            }
        }
    });

    return {
        exerciseHours,
        targetHours: Number(args[2]),
    };
};
