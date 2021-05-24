import './css/App.css';
import Grid from './components/Grid';
import Button from './components/Button';
import Tempo from './components/Tempo';
import {useState, useEffect} from 'react';

function App() {
  const [bpm, setBpm] = useState(120);
  useEffect(() => {
    console.log(bpm);
  }, [bpm])

  const checkValue = val => {
    if (!val) {
      setBpm('');
      return false;
    }
    if (+val > 500) {
      setBpm(500);
      return false;
    }
    if (+val <= 0) {
      setBpm(1);
      return false;
    }
    return true;
  }

  const trimNum = num => {
    const numArray = num.toString().split('.');
    const decimals = numArray[1];
    let newDecimals = '';
    if (decimals?.length > 3) {
      newDecimals = decimals.slice(0, 3);
      return +[numArray[0], newDecimals].join('.');
    } else if (decimals) {
      newDecimals = decimals;
      return +[numArray[0], newDecimals].join('.');
    } else {
      return numArray[0];
    };
  }

  const handleSub = (num) => {
    const newBpm = trimNum(+bpm - num);
    if (!checkValue(newBpm)) return;
    setBpm(newBpm);
  }
  const handleAdd = (num) => {
    const newBpm = trimNum(+bpm + num);
    if (!checkValue(newBpm)) return;
    setBpm(newBpm);
  }
  const handleDiv = () => {
    const newBpm = trimNum(+bpm / 2);
    if (!checkValue(newBpm)) return;
    setBpm(newBpm);
  }
  const handleMult = () => {
    const newBpm = trimNum(+bpm * 2);
    if (!checkValue(newBpm)) return;
    setBpm(newBpm);
  }

  const handleChange = (e) => {
    if (!checkValue(e.target.value)) return;
    const newBpm = trimNum(+e.target.value);
    setBpm(newBpm);
  }

  return (
    <div className="App">
      <Grid>
        <Tempo handleChange={handleChange} bpm={bpm}/>
        <Button className='subOne' handleClick={() => handleSub(1)} content='-1'></Button>
        <Button className='addOne' handleClick={() => handleAdd(1)} content='+1'></Button>
        <Button className='subTen' handleClick={() => handleSub(10)} content='-10'></Button>
        <Button className='addTen' handleClick={() => handleAdd(10)} content='+10'></Button>
        <Button className='div' handleClick={handleDiv} content='/2'></Button>
        <Button className='mult' handleClick={handleMult} content='x2'></Button>
      </Grid>
    </div>
  );
}

export default App;
