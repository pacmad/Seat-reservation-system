import { mount } from "enzyme"

import Booking from "../BookingPage/Booking"
import { Alert } from 'antd'

it("<Alert/> is rendering when showPopUp is equals true", () => {
    const wrapper = mount(<Booking />)
    wrapper.setState({ showPopUp: true })
    expect(wrapper.containsAllMatchingElements([
        <Alert message="" />,
    ])).toBe(true)
})

it("<Alert/> is not rendering when showPopUp is equals false", () => {
    const wrapper = mount(<Booking />)
    wrapper.setState({ showPopUp: false })
    expect(wrapper.containsAllMatchingElements([
        <Alert message="" />,
    ])).toBe(false)
})

