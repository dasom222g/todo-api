import React from 'react';
import './App.css';
import { UsersProvider } from './practice/UserContextSample';
// import PromiseSample from './practice/PromiseSample';
// import MockSample from './practice/MockSample';
// import ContextSample from './practice/ContextSample'
import UsersSample from './practice/UsersSample';

function App() {

  return (
    <div className="wrap">
      {/* <PromiseSample /> */}
      {/* <MockSample /> */}
      {/* <ContextSample /> */}
      <UsersProvider>
        <UsersSample />
      </UsersProvider>
    </div>
  )
}

export default App;
