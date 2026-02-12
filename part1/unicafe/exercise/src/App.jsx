import { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      {props.text} {props.value} {props.sign}
    </div>
  )
}

const Statistics = (props) => {

  const all = props.good + props.neutral + props.bad

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>

      <StatisticLine text={"good"} value={props.good} />
      <StatisticLine text={"neutral"} value={props.neutral} />
      <StatisticLine text={"bad"} value={props.bad} />
      <StatisticLine text={"all"} value={all} />

      <StatisticLine text={"average"} value={(props.good - props.bad) / (all)} />

      <StatisticLine text={"positive"} value={(props.good / (all)) * 100} sign={"%"} />
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

      <Button onClick={handleGood} text={"good"} />
      <Button onClick={handleNeutral} text={"neutral"} />
      <Button onClick={handleBad} text={"bad"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App