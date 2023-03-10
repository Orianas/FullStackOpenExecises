import { useState } from 'react'

const Header = () => <h1>Give Feedback</h1>
const StattisticsLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad
  if (total === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StattisticsLine label='good' value={good} />
          <StattisticsLine label='neutral' value={neutral} />
          <StattisticsLine label='bad' value={bad} />
          <StattisticsLine label='all' value={total} />
          <StattisticsLine label='average' value={(good - bad) / total} />
          <StattisticsLine label='positive' value={((good / total) * 100).toString().concat('%')} />
        </tbody>
      </table>
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