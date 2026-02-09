import { useState } from 'react'

const Statistics = (props) => {

  const all = props.good + props.neutral + props.bad

  return (
    <div>
      <h1>statistics</h1>

      good {props.good} <br />
      neutral {props.neutral} <br />
      bad {props.bad} <br />
      all {all} <br />

      average {(props.good - props.bad) / (all)} <br />

      positive { (props.good / (all)) * 100} %
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App