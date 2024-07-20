type TeamSubmission = {
    teamName: string,
    veredict: "WA" | "CORRECT" | "TLE",
    minutes: number
}

type ScoreboardMessage = {
    type: "SUBMISSION" | "TIME_FREEZE" | "REVELATOR",
    payload: TeamSubmission | string
}

export default ScoreboardMessage;