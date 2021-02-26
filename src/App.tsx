import React, { useEffect, useState } from 'react';
import './App.css';
// import PromisePractice from './practice/PromisePractice';

type prams = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export interface cartType {
  loading: boolean,
  data: prams[],
  state: string
}

function App() {

  const [cart, setCart] = useState<cartType>({
    loading: true,
    data: [],
    state:'init'
  })

  useEffect(() => {
    setCart(prev => ({...prev, state:'first set'}))
    fetch('/api/cart', {
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.items)
      setCart(prev => ({...prev, loading: false, data: data.items, state: 'success'}))
    })
    .catch((e) => {
      console.log(e)
      setCart(prev => ({...prev, loading: false, state: 'error'}))
    })
  }, [])

  return (
    <div className="wrap">
      {/* <PromisePractice /> */}
      {/* {cart.data.map(item => <div>{item}</div>)} */}
      {cart.data.map(item => {
        return (
          <div key={item.id}>
            <div>userId: {item.userId}</div>
            <div>id: {item.id}</div>
            <div>title: {item.title}</div>
            <div>completed: {item.completed}</div>
          </div>
        )
      })}
    </div>
  )
}

export default App;
