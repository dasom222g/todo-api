import React from 'react'
import { createStore } from 'redux'

// action 타입 정의

const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'
const CHANGE_TEXT = 'CHANGE_TEXT'
const ADD_ITEM = 'ADD_ITEM'

type ItemType = {
  id: number,
  text: string
}

type ActionType =
  | { type: 'INCREASE' }
  | { type: 'DECREASE' }
  | { type: 'CHANGE_TEXT', payload: string }
  | { type: 'ADD_ITEM', payload: ItemType }

  type StateType = {
    counter: number,
    text: string,
    list: ItemType[]
  }

function ReduxSample() {
  const initialState = {
    counter: 0,
    text: '',
    list: []
  }

  // action 생성 함수
  const increase = (): ActionType => ({
    type: INCREASE
  })

  const decrease = (): ActionType => ({
    type: DECREASE,
  })

  const changeText = (text: string): ActionType => ({
    type: CHANGE_TEXT,
    payload: text
  })

  const addItem = (item: ItemType): ActionType => ({
    type: ADD_ITEM,
    payload: item
  })

  const reducer = (state: StateType = initialState , action: ActionType): StateType => {
    switch (action.type) {
      case INCREASE:
        return {
          ...state,
          counter: state.counter + 1
        }
      case DECREASE:
        return {
          ...state,
          counter: state.counter - 1
        }
      case CHANGE_TEXT:
        return {
          ...state,
          text: action.payload
        }
      case ADD_ITEM:
        return {
          ...state,
          list: [...state.list, action.payload]
        }
      default:
        return state
    }
  }

  const store = createStore(reducer)

  const listener = () => {
    const state = store.getState()
    console.log('state', state)
  }

  const unSubscribe = store.subscribe(listener) // state값 바뀌면 listener함수 호출됨

  store.dispatch(increase())
  store.dispatch(decrease())
  store.dispatch(changeText('test중'))
  store.dispatch(addItem({id: 1, text: '와우'}))

  unSubscribe() // 구독취소로 state값은 계속 변하지만 구독하던 함수는 호출되지않음
  store.dispatch(increase())
  store.dispatch(increase())
  store.dispatch(increase())
  console.log(store.getState())

  return (
    <div>
      ReduxSample
    </div>
  )
}

export default ReduxSample
