import * as actions from "./actionTypes"
import { Seats } from "../interfaces"

const initialSeatsReducer: Seats[] = []

export const seatsReducer = (state = initialSeatsReducer, action: actions.GetBookSeatsActionTypes): Seats[] => {
    if (action.type === actions.GET_SEATS) {
        return action.payload.seats
    } else if (action.type === actions.BOOK_SEATS) {
        return state.map((content: Seats, i: number) => i === state.indexOf(action.payload.seat) ? action.payload.seat : content)
    }
    return state
}

const initialRecentlyBookedReducer: Seats[] = []

export const recentlyBookedReducer = (state = initialRecentlyBookedReducer, action: actions.RecentlyBooked): Seats[] => {
    if (action.type === actions.RECENTLY_BOOKED) {
        return action.payload.recentlyBooked
    }
    return state
}

const initialPickSeatsReducer: actions.PickSeatsPayload = { amount: 0, together: false }

export const pickSeatsReducer = (state = initialPickSeatsReducer, action: actions.PickSeats): actions.PickSeatsPayload => {
    if (action.type === actions.PICK_SEATS) {
        return {
            ...state,
            amount: action.payload.amount,
            together: action.payload.together
        }
    }
    return state
}