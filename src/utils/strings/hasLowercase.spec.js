/* eslint no-console: 0, max-nested-callbacks: 0 */
import { hasLowercase } from './hasLowercase'

describe('src | utils | strings | hasLowercase', () => {
  it('return false', () => {
    const expected = false
    let value = ''
    let received = hasLowercase(value)
    expect(received).toEqual(expected)
    value = false
    received = hasLowercase(value)
    expect(received).toEqual(expected)
    value = null
    received = hasLowercase(value)
    expect(received).toEqual(expected)
    value = 1234
    received = hasLowercase(value)
    expect(received).toEqual(expected)
    value = 0
    received = hasLowercase(value)
    expect(received).toEqual(expected)
    value = undefined
    received = hasLowercase(value)
    expect(received).toEqual(expected)
    value = null
    received = hasLowercase(value)
    expect(received).toEqual(expected)
    value = []
    received = hasLowercase(value)
    expect(received).toEqual(expected)
    value = {}
    received = hasLowercase(value)
    expect(received).toEqual(expected)
    value = '      '
    received = hasLowercase(value)
    expect(received).toEqual(expected)
  })
  it('return true', () => {
    const expected = true
    let value = 'a'
    let received = hasLowercase(value)
    expect(received).toEqual(expected)
    value = '     a'
    received = hasLowercase(value)
    expect(received).toEqual(expected)
  })
})
