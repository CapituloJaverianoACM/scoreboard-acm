type TeamSubmission = {
    teamName: string,
    problemLetter: string,
    veredict: "WA" | "CORRECT" | "TLE",
    minutes: number
}

type ScoreboardMessage = {
    type: "SUBMISSION" | "TIME_FREEZE" | "REVELATOR",
    payload: TeamSubmission | string
}

export type { ScoreboardMessage, TeamSubmission };

export default ScoreboardMessage;