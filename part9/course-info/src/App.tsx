import { ReactElement } from "react";

interface HeaderProps {
    courseName: string;
}
interface PartProps {
    part: CoursePart;
}
interface ContentProps {
    courseParts: CoursePart[];
}

interface TotalProps {
    totalExercises: number;
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
}

interface CoursePartDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartDescription {
    kind: "basic";
}

interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special";
}

type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;

const App = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part",
            kind: "basic",
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            kind: "group",
        },
        {
            name: "Basics of type Narrowing",
            exerciseCount: 7,
            description: "How to go from unknown to string",
            kind: "basic",
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            backgroundMaterial:
                "https://type-level-typescript.com/template-literal-types",
            kind: "background",
        },
        {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            kind: "special",
        },
    ];

    const totalExercises = courseParts.reduce(
        (sum, part) => sum + part.exerciseCount,
        0
    );

    const Header = (props: HeaderProps) => (
        <>
            <h1>{props.courseName}</h1>
        </>
    );

    const Part = ({ part }: PartProps) => {
        const partTitle: ReactElement = (
            <strong>
                {part.name} {part.exerciseCount}
            </strong>
        );
        let partContent: ReactElement;

        switch (part.kind) {
            case "basic":
                partContent = (
                    <>
                        <i>{part.description}</i>
                    </>
                );
                break;
            case "group":
                partContent = (
                    <>
                        <span>
                            Project Exercises{" "}
                            {part.groupProjectCount.toString()}
                        </span>
                    </>
                );
                break;
            case "background":
                partContent = (
                    <>
                        <i>{part.description}</i>
                        <br />
                        <span>Submit to : {part.backgroundMaterial}</span>
                    </>
                );
                break;
            case "special":
                partContent = (
                    <>
                        <i>{part.description}</i>
                        <br />
                        <span>
                            required skills: {part.requirements.join(", ")}
                        </span>
                    </>
                );
                break;
        }

        return (
            <p>
                {partTitle}
                <br />
                {partContent}
            </p>
        );
    };

    const Content = (props: ContentProps) => {
        return props.courseParts.map((coursePart) => (
            <Part part={coursePart}></Part>
        ));
    };

    const Total = (props: TotalProps) => (
        <>
            <p>Number of exercises {props.totalExercises}</p>
        </>
    );

    return (
        <div>
            <Header courseName={courseName} />
            <Content courseParts={courseParts} />
            <Total totalExercises={totalExercises} />
        </div>
    );
};

export default App;
