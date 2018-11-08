/* eslint no-console: 0 */
// ./node_modules/.bin/jest --env=jsdom ./path/to/file.spec.js --watch
import onCalendarUpdates from '../onCalendarUpdates'

describe('src | components | booking | utils | onCalendarUpdates', () => {
  xit('it expect something', () => {
    const value = { prop: 'prop' }
    const expected = { prop: 'prop' }
    const result = onCalendarUpdates(value)
    expect(result).toStrictEqual(expected)
  })
})
