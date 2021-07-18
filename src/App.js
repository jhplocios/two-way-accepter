import { useState } from 'react';
import ContainedButtons from './components/Button';
import DenseAppBar from './components/DenseAppBar';
import MinHeightTextarea from './components/TextArea';
import TextFieldBasic from './components/TextFieldBasic';
import styled from 'styled-components';

const testData = `1 right (a,2) (b,1) (#,4)
2 right (a,3) (b,2) (#,9)
3 right (a,1) (b,3) (#,9)
4 left (a,4) (b,5) (#,9)
5 left (a,5) (b,6) (#,8)
6 left (a,6) (b,7) (#,9)
7 left (a,7) (b,4) (#,9)
8 accept
9 reject`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 100px;
  box-sizing: border-box;
`

const SubContainers = styled.div`
  padding: 2em;

`

function App() {
  const [stateMachine, setStateMachine] = useState({});
  const [stateFlow, setStateFlow] = useState(testData);
  const [omega, setOmega] = useState('abaa')

  const handleSet = () => {
    const flows = stateFlow.trim().split('\n')

    const sm = flows.reduce((acc, cur) => {
      const [n, state, ...transitions] = cur.trim().split(' ')
      acc[n] = {}
      acc[n]['step'] = state.toLowerCase()

      transitions.forEach(transition => {
        const x = transition.slice(1).slice(0, 3).split(',')
        acc[n][x[0]] = Number(x[1])
      })

      if (state.toLowerCase() === 'accept') {
        acc[n] = 'accept'
      }

      if (state.toLowerCase() === 'reject') {
        acc[n] = 'reject'
      }

      return acc
    }, {})
    console.log(sm)
    setStateMachine(sm)
  }

  const handleCheck = () => {
    const chars = ["#", ...omega.split('')]

    let currentNode = 1
    let idx = 0

    let node = stateMachine[currentNode]

    while (true) {
      const nextChar = node['step'] === 'right' ? (chars[++idx] || "#") : (chars[--idx] || "#")

      if (node === "accept" || node === "reject") {
        break;
      }

      currentNode = node[nextChar]
      node = stateMachine[currentNode];
    }

    if (node === 'accept') {
      alert(`${omega} is accepted`)
    } else {
      alert(`${omega} is rejected`)
    }
  }

  return (
    <>
      <DenseAppBar />
      <Container>
        <SubContainers>
          <MinHeightTextarea stateFlow={stateFlow} onChange={e => setStateFlow(e.target.value)} />
          <ContainedButtons onClick={handleSet}>Set</ContainedButtons>
        </SubContainers>
        <SubContainers>
          <TextFieldBasic value={omega} onChange={e => setOmega(e.target.value)} />
          <ContainedButtons onClick={handleCheck}>Check</ContainedButtons>
        </SubContainers>
      </Container>
    </>

  );
}

export default App;
