import React from 'react'
import CounterContainer from './practice/redux/containers/CounterContainer'
import TodosContainer from './practice/redux/containers/TodosContainer'
import RootRedux from './practice/redux/RootRedux'
// import PromiseSample from './practice/PromiseSample';
// import MockSample from './practice/MockSample';
// import ContextSample from './practice/ContextSample'
// import { UsersProvider } from './practice/UserContextSample';
// import UsersSample from './practice/UsersSample';
// import ReduxSample from './practice/ReduxSample';

function Practice() {
  return (
    <div>
      {/* <PromiseSample />
      <MockSample />
      <ContextSample />
      <UsersProvider>
        <UsersSample />
      </UsersProvider>
      <ReduxSample /> */}
      <RootRedux>
        <CounterContainer />
        <hr style={{ padding: '10px 0' }} />
        <TodosContainer />
      </RootRedux>
    </div>
  )
}

export default Practice
