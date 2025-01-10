import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING',
    }

    deepFreeze(state)

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })
  test('OK is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('all values return to zero', () => {
    const state = initialState
    deepFreeze(state)

    const newStateOK = counterReducer(state, { type: 'OK' })
    expect(newStateOK).toEqual({ good: 0, ok: 1, bad: 0 })

    deepFreeze(newStateOK)
    const newStateGood = counterReducer(newStateOK, { type: 'GOOD' })
    expect(newStateGood).toEqual({ good: 1, ok: 1, bad: 0 })

    deepFreeze(newStateGood)
    const newStateBad = counterReducer(newStateGood, { type: 'BAD' })
    expect(newStateBad).toEqual({ good: 1, ok: 1, bad: 1 })

    deepFreeze(newStateBad)
    const newStateZero = counterReducer(newStateBad, { type: 'ZERO' })
    expect(newStateZero).toEqual({ good: 0, ok: 0, bad: 0 })
  })
})