import { Seats } from "../interfaces"

export const PICK_SEATS = "PICK_SEATS"
export const GET_SEATS = "GET_SEATS"
export const RECENTLY_BOOKED = "RECENTLY_BOOKED"
export const BOOK_SEATS = "BOOK_SEATS"

export interface PickSeatsPayload {
    amount: number,
    together: boolean
}

export interface PickSeats {
    type: typeof PICK_SEATS,
    payload: PickSeatsPayload
}

export interface GetSeats {
    type: typeof GET_SEATS,
    payload: {
        seats: Seats[]
    }

}

export interface RecentlyBooked {
    type: typeof RECENTLY_BOOKED,
    payload: {
        recentlyBooked: Seats[]
    }
}

export interface BookSeats {
    type: typeof BOOK_SEATS,
    payload: {
        seat: Seats,
    }
}


export type GetBookSeatsActionTypes = GetSeats | BookSeats

export type AppActions = PickSeats | RecentlyBooked | GetBookSeatsActionTypes
