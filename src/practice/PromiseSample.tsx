import React from 'react'

export const PromiseSample = () => {
  // const myPromise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve('resolve함수의 던지는값이 사용하는 곳에서 result값이 됨')
  //     // reject('실패할 경우')
  //   }, 1000)
  // })

  // myPromise.then(result => {
  //   console.log('result', result)
  // }).catch(e => {
  //   console.error(e)
  // })

  const inCrease = <T extends unknown>(n: T) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const value: number = typeof n === 'number' ? n + 1 : 0
        if (value === 5) {
          const error = new Error()
          error.name = 'ValueFiveError'
          reject(error)
          return
        }
        console.log('value', value)
        resolve(value)
      }, 1000)
    })
  }

  inCrease(0).then(inCrease)
  .then(inCrease)
  .then(inCrease)
  .then(inCrease)
  .then(inCrease)
  .catch(e => {
    console.error(e)
  })

  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function process() {
    console.log('hi')
    await sleep(2000)
    console.log('by')
  }
  return (
    <>
      <button type="button" onClick={process}>async test</button>
    </>
  )
}

export default PromiseSample