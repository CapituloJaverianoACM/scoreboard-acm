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
    acceptedMinute: number,
    status: "SOLVED" | "AC" | "PENDING" | "WA"
}

type TeamStatus = {
    team: Team,
    results: TeamResult[]
    penalty: number
}

type TeamSubmission = {
    teamName: string,
    veredict: "WA" | "CORRECT" | "TLE",
    minutes: number
}

type Contest = {
    name : string,
    durationMinutes : number,
    frozenMinutes : number,
}

export type { Contest, Team, Problem, TeamResult, TeamStatus, TeamSubmission }