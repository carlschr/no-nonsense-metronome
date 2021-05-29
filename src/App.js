import './css/App.css';
import Grid from './components/Grid';
import Button from './components/Button';
import Tempo from './components/Tempo';
import { useState, useEffect } from 'react';

function App() {
  const [bpm, setBpm] = useState(120);
  const [on, setOn] = useState(false);

  const waAPI = {
    setup() {
      this.ac = new (window.AudioContext || window.webkitAudioContext)();
      let buf = this.ac.createBuffer(1, this.ac.sampleRate * 60, this.ac.sampleRate);
      let channel = buf.getChannelData(0);
      const duration = this.ac.sampleRate / 50;
      let amp = 1;
      let phase = 0;
      const f = 330;
      // Loops through duration of wave within sample
      for (var i = 0; i < duration; i++) {
        channel[i] = Math.sin(phase) * amp;
        phase += 2 * Math.PI * f / this.ac.sampleRate;
        if (phase > 2 * Math.PI) {
          phase -= 2 * Math.PI;
        }
        amp -= 1 / duration;
      }
      this.source = this.ac.createBufferSource();
      this.source.buffer = buf;
      this.source.loop = true;
      this.source.loopEnd = 1 / (bpm / 60)
      this.source.connect(this.ac.destination);
      this.source.start(0)
    },
    update(tempo) {
      if (this.source) {
        this.source.loopEnd = 1 / (tempo / 60);
      }
    },
    pause() {
      this.ac.suspend();
    },
    unpause() {
      this.ac.resume();
    }
  }

  // UseEffect
  useEffect(() => {
    waAPI.setup();
  }, [bpm])
  //

  const handleAudioChange = () => {
    if (waAPI.ac.state === 'running') {
      waAPI.pause();
    } else {
      waAPI.unpause();
    }
  }

  const checkValue = val => {
    if (!val) {
      waAPI.pause()
      setBpm(120);
      return false;
    }
    if (+val > 500) {
      waAPI.pause()
      setBpm(500);
      return false;
    }
    if (+val < 1) {
      waAPI.pause()
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
    waAPI.pause();
    setBpm(newBpm);
  }
  const handleAdd = (num) => {
    const newBpm = trimNum(+bpm + num);
    if (!checkValue(newBpm)) return;
    waAPI.pause();
    setBpm(newBpm);
  }
  const handleDiv = () => {
    const newBpm = trimNum(+bpm / 2);
    if (!checkValue(newBpm)) return;
    waAPI.pause();
    setBpm(newBpm);
  }
  const handleMult = () => {
    const newBpm = trimNum(+bpm * 2);
    if (!checkValue(newBpm)) return;
    waAPI.pause();
    setBpm(newBpm);
  }

  const handleChange = (e) => {
    if (!checkValue(e.target.value)) return;
    const newBpm = trimNum(+e.target.value);
    waAPI.pause()
    setBpm(newBpm);
  }

  return (
    <div className="App">
      <Grid>
        <Tempo handleChange={handleChange} bpm={bpm} />
        <Button className='toggle' handleClick={() => handleAudioChange()} content='Start/Stop' />
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
