import splash, {
  closeSplash,
  showSplash,
  SHOW_SPLASH,
  CLOSE_SPLASH,
} from '../splash'

describe('src | reducers | splash  ', () => {
  it('should return the initial state by default', () => {
    // given
    const initialState = {
      closeTimeout: 1000,
      isActive: true,
    }
    const action = {}

    // when
    const updatedState = splash(undefined, action)

    // then
    expect(updatedState).toEqual(initialState)
  })
  it('should set state when action is CLOSE_SPLASH ', () => {
    // given
    const state = {}
    const action = { type: CLOSE_SPLASH }

    // when
    const updatedState = splash(state, action)
    const expected = { isActive: false }

    // then
    expect(updatedState).toEqual(expected)
  })

  it('should set state when action is SHOW_SPLASH ', () => {
    // given
    const state = {}
    const action = { type: SHOW_SPLASH }

    // when
    const updatedState = splash(state, action)
    const expected = { isActive: true }

    // then
    expect(updatedState).toEqual(expected)
  })
})

describe('src | reducers | action | showSplash', () => {
  it('should return correct action type', () => {
    // when
    const action = closeSplash()
    const expected = {
      type: 'CLOSE_SPLASH',
    }

    // then
    expect(action).toMatchObject(expected)
  })
})
describe('src | reducers | action | showSplash', () => {
  it('should return correct action type', () => {
    // when
    const action = showSplash()
    const expected = {
      type: 'SHOW_SPLASH',
    }

    // then
    expect(action).toMatchObject(expected)
  })
})
