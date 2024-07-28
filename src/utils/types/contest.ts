type Problem = {
    letter: string,
    name: string,
}

type Team = {
    name: string,
    shortName: string
}

type TeamResult = {
    problem: Problem,
    tries: number,
    acceptedTimeStamp: string,
    seconds: number,
    status: "SOLVED" | "AC" | "PENDING" | "WA"
}

type Submission = {
    team: string,
    submission: {
        problem: string,
        result: string,
        timeStamp: string,
        seconds: number,
        isFrozen: boolean
    }
}

type TeamStatus = {
    team: Team,
    results: TeamResult[]
    penalty: number,
    frozenSubmissions: Submission[],
    problemsSolved: number
}


type Contest = {
    name : string,
    durationMinutes : number,
    frozenMinutes : number,
}

export type { Contest, Team, Problem, TeamResult, TeamStatus, Submission }