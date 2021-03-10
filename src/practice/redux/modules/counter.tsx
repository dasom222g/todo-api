// import { createStore } from "redux"

export type CounterStateType = {
  number: number,
  diff: number
}

// action type

const SET_DIFF = 'counter/SET_DIFF'
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'

export type CounterActionType =
  | {type: typeof SET_DIFF, diff: number}
  | {type: typeof INCREASE}
  | {type: typeof DECREASE}

// action 생성 함수

export const setDiff = (diff: number): CounterActionType => ({
  type: SET_DIFF,
  diff
})

export const increase = (): CounterActionType => ({
  type: INCREASE
})

export const decrease = (): CounterActionType => ({
  type: DECREASE
})

// reducer

const initialState: CounterStateType = {
  number : 0,
  diff: 1
}

export default function counterReducer (state: CounterStateType = initialState, action: CounterActionType): CounterStateType {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff
      }
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff
      }
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff
      }
    default:
      return state
  }
}
