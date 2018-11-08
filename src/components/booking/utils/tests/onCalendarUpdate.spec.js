// jest ./src/components/booking/utils/tests/onCalendarUpdates --watch
import onCalendarUpdates from '../onCalendarUpdates'

describe('src | components | booking | utils | onCalendarUpdates', () => {
  xit('it expect something', () => {
    const value = { prop: 'prop' }
    const expected = { prop: 'prop' }
    const result = onCalendarUpdates(value)
    expect(result).toStrictEqual(expected)
  })
})
