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

type Contest = {
    problems: Problem[],
    teams: Team[],
    teamStatus: TeamStatus[],
    teamResults: TeamResult[]
}

export type { Contest, Team, Problem, TeamResult, TeamStatus }