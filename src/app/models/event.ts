import { User } from './user';

// Event conflicts with JS things so I had to rename this.
export interface GameEvent {
    id: number,
    name: string,
    minPlayers: number,
    maxPlayers: number,
    location: string,
    startTime: Date,
    endTime: Date,
    participants: User[],
    host: User,
    requestNeeded: boolean,
    requestsOpen: boolean
}