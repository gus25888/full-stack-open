import { useState } from 'react'

const Title = ({ titleName }) => (<>
  <h2>{titleName}</h2>
</>)

const Button = ({ handleClick, buttonText }) => (
  <button onClick={handleClick}>{buttonText}</button>
)

const StatisticLine = ({ statisticName, statisticValue }) => (
  <tr><td>{statisticName}</td><td>{statisticValue}</td></tr>
)

const Statistics = ({ indicators }) => {

  if (indicators.all === 0) {
    return (
      <div>no feedback given</div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine statisticName='good' statisticValue={indicators.good} />
        <StatisticLine statisticName='neutral' statisticValue={indicators.neutral} />
        <StatisticLine statisticName='bad' statisticValue={indicators.bad} />
        <StatisticLine statisticName='all' statisticValue={indicators.all} />
        <StatisticLine statisticName='average' statisticValue={indicators.average} />
        <StatisticLine statisticName='positive' statisticValue={indicators.positive + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getPunctuationTotal = () => {
    return good + neutral + bad
  }
  const getPunctuationAverage = () => {
    const total = getPunctuationTotal();
    return (total === 0) ? 0 : ((good * 1) + (neutral * 0) + (bad * -1)) / total;
  }
  const getPunctuationPositive = () => {
    const total = getPunctuationTotal();
    return (total === 0) ? 0 : good / total * 100;
  }

  const indicators = {
    'good': good,
    'neutral': neutral,
    'bad': bad,
    'all': getPunctuationTotal(),
    'average': getPunctuationAverage(),
    'positive': getPunctuationPositive()
  }

  return (
    <div>
      <Title titleName='give feedback' />
      <Button handleClick={() => setGood(good + 1)} buttonText='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} buttonText='neutral' />
      <Button handleClick={() => setBad(bad + 1)} buttonText='bad' />
      <Title titleName='statistics' />
      <Statistics indicators={indicators} />
    </div>
  )
}

export default App