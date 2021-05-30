import { mount } from "enzyme"
import { Seats } from "../../interfaces"
import { recentlyBooked } from "../../services/action"
import store from "../../services/store"

import Summary from "../SummaryPage/Summary"

it("correctly rendering the reserved seats with data from redux", () => {
    let recentlyBookedTab: Seats[] = []
    for (let i = 0; i < 4; i++) {
        recentlyBookedTab.push({
            id: "testid",
            cords: {
                x: i,
                y: i
            },
            reserved: true
        })
    }
    store.dispatch(recentlyBooked(recentlyBookedTab))

    const wrapper = mount(<Summary />)

    expect(wrapper.containsAllMatchingElements([
        <span>- rząd x0, miejsce y0 {"(id0)"}</span>,
        <span>- rząd x1, miejsce y1 {"(id1)"}</span>,
        <span>- rząd x2, miejsce y2 {"(id2)"}</span>,
        <span>- rząd x3, miejsce y3 {"(id3)"}</span>,
    ])).toBe(true)
})