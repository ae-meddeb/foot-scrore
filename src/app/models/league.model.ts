import { Country } from "./types/Country";

export class League {
    constructor(
        public id: number,
        public name: string,
        public country: Country
    ) {}
}