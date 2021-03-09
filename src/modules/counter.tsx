// import { createStore } from "redux"

type StateType = {
  number: number,
  diff: number
}


// action type
const SET_DIFF = 'counter/SET_DIFF'
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'

type ActionType =
  | {type: typeof SET_DIFF, diff: number}
  | {type: typeof INCREASE  , diff: number}
  | {type: typeof DECREASE, diff: number}

// action 생성 함수
export const setDiff = (diff: number) => ({
  type: SET_DIFF,
  diff
})

export const increase = () => ({
  type: INCREASE
})

export const decrease = () => ({
  type: DECREASE
})

// reducer

const initialState: StateType = {
  number : 0,
  diff: 1
}

export default function reducer (state: StateType = initialState, action: ActionType): StateType {
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


// const store = createStore(reducer)