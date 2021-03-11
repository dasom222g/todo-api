import React, { Dispatch } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {
  CounterStateType,
  CounterActionType,
  increase,
  decrease,
  setDiff,
} from '../modules/counter'
import Counter from '../components/Counter'
import { TodoItemType } from '../modules/todos'

interface IRootState {
  counterReducer: CounterStateType
  todoReducer: TodoItemType[]
}

function CounterContainer() {
  // const state = useSelector((state: IRootState) => state.counterReducer)
  // console.log('state', state)

  // const { number, diff } = useSelector((state: IRootState) => ({
  //   number: state.counterReducer.number,
  //   diff: state.counterReducer.diff
  // }), (left, right) => {
  //   return left.number === right.number && left.diff === right.diff
  // })]

  // state값 참조하여 객체 생성할 경우 shallowEqual
  const { number, diff } = useSelector(
    (state: IRootState) => ({
      number: state.counterReducer.number,
      diff: state.counterReducer.diff,
    }),
    shallowEqual,
  )

  const dispatch = useDispatch<Dispatch<CounterActionType>>()
  const onIncrease = () => dispatch(increase())
  const onDecrease = () => dispatch(decrease())
  const onSetDiff = (diff: number) => dispatch(setDiff(diff))

  return (
    <>
      <Counter
        number={number}
        diff={diff}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onSetDiff={onSetDiff}
      />
    </>
  )
}

export default CounterContainer
