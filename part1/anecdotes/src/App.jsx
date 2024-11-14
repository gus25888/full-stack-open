import { useState } from 'react'

const Title = ({ textTitle }) => (<h2>{textTitle}</h2>)

const Anecdote = ({ anecdote, votesQuantity }) => (
  <>
    <p>{anecdote}</p>
    <p>Has {votesQuantity} {(votesQuantity === 1) ? 'vote' : 'votes'}</p>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0);

  const getNextAnecdote = () => {
    let nextAnecdote = 0;
    do {
      nextAnecdote = Math.floor(Math.random() * anecdotes.length);
    } while (nextAnecdote === selected);

    setSelected(nextAnecdote)
  }

  const voteForAnecdote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
    setMostVoted(getMostVotedAnecdote(votesCopy));
  }

  const getMostVotedAnecdote = (votesList) => {
    let indexMaxVoted = 0;
    let votesQuantity = 0;

    votesList.forEach((vote, index) => {
      if (vote > votesQuantity) {
        votesQuantity = vote;
        indexMaxVoted = index;
      }
    });

    return indexMaxVoted;
  }

  return (
    <div>
      <Title textTitle={'Anecdote of the day'} />
      <Anecdote anecdote={anecdotes[selected]} votesQuantity={votes[selected]} />
      <button onClick={voteForAnecdote}>vote</button>
      <button onClick={getNextAnecdote}>next anecdote</button>
      <Title textTitle={'Anecdote with most votes'} />
      <Anecdote anecdote={anecdotes[mostVoted]} votesQuantity={votes[mostVoted]} />
    </div>
  )
}

export default App