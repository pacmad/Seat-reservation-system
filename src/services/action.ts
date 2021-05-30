import * as actions from "./actionTypes"
import { Seats } from "../interfaces"

export const pickSeats = (amount: number, together: boolean): actions.AppActions => {
    return {
        type: actions.PICK_SEATS,
        payload: {
            amount: amount,
            together: together
        }
    }
}

export const getSeats = (seats: Seats[]): actions.AppActions => {
    return {
        type: actions.GET_SEATS,
        payload: {
            seats: seats,
        }
    }
}

export const recentlyBooked = (seats: Seats[]): actions.AppActions => {
    return {
        type: actions.RECENTLY_BOOKED,
        payload: {
            recentlyBooked: seats,
        }
    }
}

export const bookSeats = (seat: Seats): actions.AppActions => {
    return {
        type: actions.BOOK_SEATS,
        payload: {
            seat: seat,
        }
    }
}