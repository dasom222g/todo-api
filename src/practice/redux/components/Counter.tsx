import React, { useEffect } from 'react'
import useInputs from '../../../hook/useInputs'

type CounterProps = {
  number: number
  diff: number
  onIncrease: () => void
  onDecrease: () => void
  onSetDiff: (diff: number) => void
}

const intervalStyle = {
  margin: '10px',
}

const textStyle = {
  fontSize: '1.2rem',
  padding: '10px',
}

const buttonStyle = {
  border: '1px solid #000',
  padding: '4px',
  borderRadius: '2px',
  fontSize: '1.2rem',
  margin: '0 5px',
}
function Counter({ number, diff, onIncrease, onDecrease, onSetDiff }: CounterProps) {
  const initialState = {
    diffNum: diff,
  }
  const [form, onChange] = useInputs(initialState)
  const { diffNum } = form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  useEffect(() => {
    onSetDiff(typeof diffNum === 'string' ? Number(diffNum) : diffNum)
    // eslint-disable-next-line
  }, [diffNum])

  return (
    <div>
      <h1 style={textStyle}>{number}</h1>
      <input
        type="number"
        placeholder="set diff number"
        name="diffNum"
        style={intervalStyle}
        value={diffNum}
        onChange={handleChange}
      />
      <div style={intervalStyle}>
        <button type="button" style={buttonStyle} onClick={onIncrease}>
          +
        </button>
        <button type="button" style={buttonStyle} onClick={onDecrease}>
          -
        </button>
      </div>
    </div>
  )
}

export default Counter
