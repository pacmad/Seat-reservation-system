export interface Props {
}

export interface State {
}

export interface Cords {
    x: number,
    y: number
}

export interface Seats {
    cords: Cords,
    id: string,
    reserved: boolean
}

export interface ScreeningRoomState {
    seats: Seats[],
    picked: number,
    toBook: Seats[]
    warning: string,
    showPopUp: boolean
}

export interface LegendProps {
    book: () => void
}

export interface SeatProps {
    data: Seats,
    icrement: () => void,
    decrement: () => void,
    pick: (seat: Seats) => void,
    unpick: (seat: Seats) => void,
    warning: (warningText: string) => void,
    picked: number,
    proposalSeats: Seats[]
}

export interface SeatState {
    color: string,
    style: string
}

export interface BookingState {
    amount: number,
    together: boolean
    disableCheckbox: boolean,
    warning: string,
    showPopUp: boolean
}