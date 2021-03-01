import React from 'react';
import './assets/style/pages.scss'
import './assets/style/todo.scss'
// import PromiseSample from './practice/PromiseSample';
// import MockSample from './practice/MockSample';
// import ContextSample from './practice/ContextSample'
// import { UsersProvider } from './practice/UserContextSample';
// import UsersSample from './practice/UsersSample';
import {Switch, Route} from 'react-router-dom'
import TodoHome from './pages/TodoHome';
import TodoUpdate from './pages/TodoUpdate';

function App() {

  return (
    <div className="content-wrapper">
      {/* <PromiseSample /> */}
      {/* <MockSample /> */}
      {/* <ContextSample /> */}
      {/* <UsersProvider>
        <UsersSample />
      </UsersProvider> */}
      <div className="todo">
        <Switch>
          <Route
            path="/"
            render={() =>
              <TodoHome />
            }
            exact
          />
          <Route
            path="/update"
            render={() =>
              <TodoUpdate />
            }
          />
          <Route path="/">Not found</Route>
        </Switch>
      </div>
    </div>
  )
}

export default App;
