import React, {createContext, useContext, useState} from 'react'

const MyContext = createContext('defaultValue')

function Child() {
  const text = useContext(MyContext)
  console.log('child render')
  return (
    <div>text: {text}</div>
  )
}

function Parent() {
  console.log('parent render')
  return (
    <Child />
  )
}

function GrandParent() {
  console.log('granParent render')
  return (
    <Parent />
  )
}

function ContextSample () {
  const [value, setValue] = useState(true)
  console.log('context render')
  return (
    <MyContext.Provider value={value ? 'Good': 'Bad'}>
      <GrandParent />
      <button type="button" onClick={()=> setValue(!value)}>Click</button>
    </MyContext.Provider>
  )
}

export default ContextSample