import { combineReducers } from 'redux'
import counterReducer from './counter'
import todosReducer from './todos'

const rootReducer = combineReducers({
  counterReducer,
  todosReducer
})

export default rootReducer