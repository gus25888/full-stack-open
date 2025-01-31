import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'

import About from './components/About'
import AnecdoteDetails from './components/AnecdoteDetails'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Notification from './components/Notification'
import AnecdoteContext from './AnecdoteContext'

const initialAnecdotes = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: 1
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: 2
  }
]



// const App = ({ urlList }) => {
const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)
  const [, showNotification, urlList] = useContext(AnecdoteContext)


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    showNotification(`a new anecdote '${anecdote.content}' created!`, 5)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }




  const match = useMatch(urlList.ANECDOTE_DETAILS)
  const anecdote = match ? anecdoteById(Number(match.params.id)) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification />

      <Routes>
        <Route path={urlList.HOME} element={<About />} ></Route>
        <Route path={urlList.ANECDOTE_LIST} element={<AnecdoteList anecdotes={anecdotes} />} ></Route>
        <Route path={urlList.ANECDOTE_DETAILS} element={<AnecdoteDetails anecdote={anecdote} />} ></Route>
        <Route path={urlList.ANECDOTE_CREATE} element={
          <CreateNew addNew={addNew} returnUrl={urlList.ANECDOTE_LIST} />
        } ></Route>
      </Routes>
      <Footer />
    </div>
  )
}

App.propTypes = {
  urlList: PropTypes.objectOf(
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
  )
}

export default App
