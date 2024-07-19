type TeamSubmission = {
    teamName: string,
    veredict: "WA" | "CORRECT" | "TLE",
    minutes: number
}

type ScoreboardMessage = {
    type: string,
    payload: TeamSubmission | string
}

export default ScoreboardMessage;