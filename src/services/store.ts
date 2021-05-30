import { createStore, combineReducers } from 'redux'
import { seatsReducer, recentlyBookedReducer, pickSeatsReducer } from "./reducers"

const rootReducer = combineReducers({
    selected: pickSeatsReducer,
    seats: seatsReducer,
    recentlyBooked: recentlyBookedReducer,
})

export type AppState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer)

export default store