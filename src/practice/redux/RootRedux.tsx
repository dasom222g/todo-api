import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './modules'
import { composeWithDevTools } from 'redux-devtools-extension'

type ReduxProviderProps = {
  children: React.ReactNode
}

function RootRedux({ children }: ReduxProviderProps) {
  const store = createStore(rootReducer, composeWithDevTools())
  return <Provider store={store}>{children}</Provider>
}

export default RootRedux
