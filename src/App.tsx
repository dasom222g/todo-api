import React from 'react'
import './assets/style/pages.scss'
import './assets/style/todo.scss'
import { Switch, Route } from 'react-router-dom'
import TodoHome from './pages/TodoHome'
import TodoUpdate from './pages/TodoUpdate'
// import { TodoProvider } from './context/TodoContext'
// import Practice from './Practice';

function App() {
  return (
    <div className="content-wrapper">
      {/* <Practice /> */}
      <div className="todo">
        <Switch>
          <Route path="/" render={() => <TodoHome />} exact />
          <Route path="/update/:itemId" render={() => <TodoUpdate />} />
          <Route path="/">Not found</Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
