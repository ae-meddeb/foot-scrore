import { Team } from "./team.model";


export class Match {
    constructor(
        public id: number,
        public statusCode: number,
        public hTeam: Team,
        public aTeam: Team,
        public hScore?: number,
        public aScore?: number,
        public venue?: string,
        public startDate?: number,
        public statusLabel?: string,
        public time?:number
    ) {}

    isMatchNotStarted(): boolean {
        return this.statusCode === 0;
    }

    isMatchFinished(): boolean {
        return this.statusCode === 3;
    }

    isMatchInplay(): boolean {
        return this.statusCode === 1;
    }

}