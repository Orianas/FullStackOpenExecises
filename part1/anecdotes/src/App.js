import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState({
    state: Math.floor(Math.random() * anecdotes.length),
    votes: Array(anecdotes.length).fill(0)
  })
  const setRandom = () => {
    setSelected({ ...selected, state: Math.floor(Math.random() * anecdotes.length) })
  }
  const increaseVote = () => {
    const copy = { ...selected.votes }
    copy[selected.state] += 1
    setSelected({ state: selected.state, votes: copy })
  }

  return (
    <div>
      {anecdotes[selected.state]} <br />
      has {selected.votes[selected.state]} votes <br />
      <Button handleClick={increaseVote} text='vote' />
      <Button handleClick={setRandom} text='next anecdote' />
    </div>
  )
}

export default App