import React, {useState} from 'react';
import { Checkbox, Input, Button, FormControlLabel, Modal } from '@material-ui/core';
import './App.css';
import list from './first-list.json';
import Weekly from './weekly';

function App() {
  const today = new Date().toDateString();
  const newDay = ((new Date(today) - new Date(list.lastIn))/86400000) > 0;
  const [day, setDay] = useState(list.count);
  const [maxDay, setmaxDay] = useState(7);
  const [done, setdone] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false)
  const chores = list.chores;
  const [unDone, setunDone] = useState(chores.daily.concat(chores.weekly[day]).concat(chores.longer[day]))
  Object.keys(chores).map((c) => chores[c].length > maxDay && setmaxDay(chores[c].length));
  console.log("App -> chores", chores)
  const makeCheck = (cho) => (<FormControlLabel
      control={<Checkbox checked={false} onChange={() => {
        setdone(done.concat([cho]));
        setunDone(unDone.filter((i) => i !== cho))
      }} name={cho} />}
      label={cho}
    />);
  const makeChecked = (cho) => (<FormControlLabel
    control={<Checkbox checked={true} onChange={() => {
      setdone(done.filter((i) => i !== cho))
      setunDone(unDone.concat([cho]))
    }} name={cho} />}
    label={cho}
  />);

  

    const weekly = [];
    for (let i = 0; i < 7; i++) {
      const el = chores.weekly[i] || ' ';
      console.log("App -> el", el)
      weekly.push(el);
    }
    console.log("App -> weekly", weekly)


  return (
    <div className="App">
      <header className="App-header">
        <h2>Clean Routine</h2>
      </header>
      <div style={{display: 'flex', flexDirection: 'column', marginLeft: 'auto', marginRight: 'auto', alignItems: 'center'}}>
        <h4>Today</h4>
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 'auto', marginRight: 'auto'}}>
          {unDone.map((c) => makeCheck(c))}
          {done.map((d) => makeChecked(d))}
        </div>
        <Button style={{maxWidth: 50}} onClick={() => setDay(day + 1)}>Reset</Button>
        <h4>Add New</h4>
        <Input placeholder="Daily" />
        <Input placeholder="Less Often" />
        <Button onClick={() => setmodalOpen(true)}>Weekly</Button>
        <Modal open={modalOpen}>
          <Weekly setmodal={setmodalOpen} wks={weekly} />
        </Modal>
      </div>
    </div>
  );
}

export default App;
