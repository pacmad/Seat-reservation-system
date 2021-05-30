import { mount } from "enzyme"

import ScreeningRoom from "../ScreeningRoomPage/ScreeningRoom"
import { Alert } from 'antd'


it("<Alert/> is rendering when showPopUp is equals true", () => {
    const wrapper = mount(<ScreeningRoom />)
    wrapper.setState({ showPopUp: true })
    expect(wrapper.containsAllMatchingElements([
        <Alert message="" />,
    ])).toBe(true)
})

it("<Alert/> is not rendering when showPopUp is equals false", () => {
    const wrapper = mount(<ScreeningRoom />)
    wrapper.setState({ showPopUp: false })
    expect(wrapper.containsAllMatchingElements([
        <Alert message="" />,
    ])).toBe(false)
})