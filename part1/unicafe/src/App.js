import { useState } from 'react'

const Header = () => <h1>Give Feedback</h1>
const StatDisplay = ({ label, value }) => <div>{label}: {value}</div>
const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad
  return (
    <>
      <h1>Statistics</h1>
      <StatDisplay label='good' value={good} />
      <StatDisplay label='neutral' value={neutral} />
      <StatDisplay label='bad' value={bad} />
      <StatDisplay label='all' value={total} />
      <StatDisplay label='average' value={(good - bad) / total} />
      <StatDisplay label='positive' value={((good / total) * 100).toString().concat('%')} />
    </>
  )
}

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Header />
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App