import React, {useState} from 'react';
import { List, ListItem, TextField, Checkbox, Input, Button, FormControlLabel, Modal, InputAdornment } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './App.css';
import list from './first-list.json';

//colors
const lavenderGray = '#7E6C6C';
const coral = '#F87575';
const melon = '#FFA9A3';
const lightBlue = '#B9E6FF';
const cornflower = '#5c95ff'

function App() {
  const today = new Date().toDateString();
  const newDay = ((new Date(today) - new Date(list.lastIn))/86400000) > 0;
  const [day, setDay] = useState(list.count);
  const [done, setdone] = useState([]);
  const [weekModalOpen, setweekModalOpen] = useState(false);
  const [dailyModalOpen, setdailyModalOpen] = useState(false);
  const [longerModalOpen, setlongerModalOpen] = useState(false);
  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const chores = list.chores;
  const [saveInput, setsaveInput] = useState(null);
  const useStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottom: "none"
      },
      "&&:after": {
        borderBottom: "none"
      }
    }
  });
  const [dailyChores, setdailyChores] = useState(chores.daily)
  const [weeklyChores, setweeklyChores] = useState(chores.weekly);
  const [longerChores, setlongerChores] = useState(chores.longer)
  const ColoredCheckbox = withStyles({
  root: {
    color: cornflower,
    '&$checked': {
      color: lightBlue,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
  const [unDone, setunDone] = useState(dailyChores.concat(weeklyChores[day]).concat(longerChores[day]))
  const makeCheck = (cho) => (<FormControlLabel
      key={`FormControl${cho}`}
      control={<ColoredCheckbox key={`unchecked${cho}`} checked={false} onChange={() => {
        // handle API call
        setdone(done.concat([cho]));
        setunDone(unDone.filter((i) => i !== cho))
      }} name={cho} />}
      label={cho}
      style={{color: cornflower}}
    />);
  const makeChecked = (cho) => (<FormControlLabel
    style={{color: lightBlue}}
    key={`FormControl${cho}Checked`}
    control={
      <ColoredCheckbox
        key={cho}
        checked={true}
        onChange={() => {
          // handle API Call
          setdone(done.filter((i) => i !== cho))
          setunDone(unDone.concat([cho]))
        }}
        name={cho}
      />
    }
    label={cho}
  />);

  const makeWeeklyList = () => {
    const wkArr = [];
    for (let i = 0; i < 7; i++) {
      if(weeklyChores[i]) {
        wkArr.push(
          <ListItem key={`weekly${weeklyChores[i]}`} style={{color: cornflower}}>
            <Input
              disableUnderline={true}
              style={{
                color: cornflower,
              }}
              multiline
              fullWidth
              defaultValue={weeklyChores[i]}
              onBlur={(v) => {
                const oldWks = [...weeklyChores]
                const newWks = oldWks.map((c, idx) => {
                    if (i === idx) {
                        return v.target.value;
                    }
                    return c;
                });
                setweeklyChores(newWks);
              }}
            />
          </ListItem>
        )
      } else {
      wkArr.push(
        <ListItem key={`weekly${i}`} style={{color: cornflower}}>
                  <Input
                    disableUnderline={true}
                    style={{
                      color: cornflower,
                    }}
                    multiline
                    fullWidth
                    placeholder="One Day Of Weekly Chores"
                    onBlur={(v) => {
                      const oldWks = [...weeklyChores]
                      const newWks = oldWks.map((c, idx) => {
                          if (i === idx) {
                              return v.target.value;
                          }
                          return c;
                      });
                      setweeklyChores(newWks);
                    }}
                  />
                </ListItem>
        )
      }
    }
    return wkArr;
  };


  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: coral}}>
        <h2>Clean Routine</h2>
      </header>
      <div style={{display: 'flex', flexDirection: 'column', marginLeft: 'auto', marginRight: 'auto', alignItems: 'center'}}>
        <h4 style={{color: coral}}>Today</h4>
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 'auto', marginRight: 'auto'}}>
          {unDone.map((c) => makeCheck(c))}
          {done.map((d) => makeChecked(d))}
        </div>
        <Button style={{maxWidth: 100, backgroundColor: melon, color: 'white'}} onClick={() => setDay(day + 1)}>Refresh</Button>
        <h4 style={{color: coral}}>Edit Chore Lists</h4>
        <Button
          onClick={() => setdailyModalOpen(true)}
          style={{maxWidth: 100, backgroundColor: melon, color: 'white', marginTop: 10}}
        >Daily</Button>
        <Modal open={dailyModalOpen} onBackdropClick={() => setdailyModalOpen(false)}>
          <div style={{margin: '50px 30% auto 30%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', flexDirection: 'column', paddingBottom: 10, border: `5px solid ${lightBlue}`}}>
            <List>
              {dailyChores.map((w, i) =>
                <ListItem key={`daily${w}`} style={{color: cornflower}}>
                  <Input
                    id={`oneItem${w}`}
                    disableUnderline={true}
                    style={{
                      color: cornflower,
                    }}
                    multiline
                    fullWidth
                    defaultValue={w}
                    onBlur={(v) => {
                      const oldDays = [...dailyChores]
                      const newDays = oldDays.map((c, idx) => {
                          if (i === idx) {
                              return v.target.value;
                          }
                          return c;
                      });
                      setdailyChores(newDays);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          style={{maxWidth: 100, backgroundColor: melon, color: 'white', marginBottom: 10}}
                          onClick={(e) => {
                            document.getElementById(`oneItem${w}`).value = ''
                          }}
                        >
                          Clear
                        </Button>
                      </InputAdornment>
                    }
                  />
                </ListItem>
              )}
              <ListItem>
                <Input
                  style={{
                      color: cornflower,
                    }}
                    disableUnderline={true}
                    multiline
                    fullWidth
                    placeholder="New Daily Chore"
                    onBlur={(v) => {
                      setdailyChores(dailyChores.concat([v.target.value]));
                    }}
                />
              </ListItem>
            </List>
            <Button
              onClick={() => {
                // handle API call to update DB
                setweekModalOpen(false)
              }}
              style={{backgroundColor: lightBlue, color: 'white'}}
            >Save</Button>
          </div>
        </Modal>
        <Button
          onClick={() => setweekModalOpen(true)}
          style={{maxWidth: 100, backgroundColor: melon, color: 'white', marginTop: 10}}
        >Weekly</Button>
        <Modal open={weekModalOpen} onBackdropClick={() => setweekModalOpen(false)}>
          <div style={{margin: '50px 30% auto 30%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', flexDirection: 'column', paddingBottom: 10, border: `5px solid ${lightBlue}`}}>
            <List>
               {makeWeeklyList()}
            </List>
            <Button
              onClick={() => {
                // handle API call to update DB
                setweekModalOpen(false)
              }}
              style={{backgroundColor: lightBlue, color: 'white'}}
            >Save</Button>
          </div>
        </Modal>
        <Button
          onClick={() => setlongerModalOpen(true)}
          style={{backgroundColor: melon, color: 'white', marginTop: 10}}
        >General Rotation</Button>
        <Modal open={longerModalOpen} onBackdropClick={() => setlongerModalOpen(false)}>
          <div style={{margin: '50px 30% auto 30%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', flexDirection: 'column', paddingBottom: 10, border: `5px solid ${lightBlue}`}}>
            <List>
              {longerChores.map((w, i) =>
                <ListItem key={`longer${w}`} style={{color: cornflower}}>
                  <Input
                    disableUnderline={true}
                    style={{
                      color: cornflower,
                    }}
                    multiline
                    fullWidth
                    defaultValue={w}
                    onBlur={(v) => {
                      const oldLon = [...longerChores]
                      const newLon = oldLon.map((c, idx) => {
                          if (i === idx) {
                              return v.target.value;
                          }
                          return c;
                      });
                      setlongerChores(newLon);
                    }}
                  />
                </ListItem>
              )}
              <ListItem>
                <Input
                  style={{
                      color: cornflower,
                    }}
                    multiline
                    fullWidth
                    onBlur={(v) => {
                      setlongerChores(longerChores.concat([v.target.value]));
                    }}
                    disableUnderline={true}
                    placeholder="New Chore"
                />
              </ListItem>
            </List>
            <Button
              onClick={() => {
                // handle API call to update DB
                setlongerModalOpen(false)
              }}
              style={{backgroundColor: lightBlue, color: 'white'}}
            >Save</Button>
          </div>
        </Modal>
        <Button
          onClick={() => setinfoModalOpen(true)}
          style={{backgroundColor: melon, color: 'white', marginTop: 10}}
        >How do I use this app?</Button>
        <Modal open={infoModalOpen} onBackdropClick={() => setinfoModalOpen(false)}>
          <div style={{margin: '50px 10% auto 10%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', flexDirection: 'column', paddingBottom: 10, border: `5px solid ${lightBlue}`}}>
            <p style={{color: cornflower, padding: 10}}>This is a daily chore checklist</p>
            <Button
              onClick={() => {
                setinfoModalOpen(false)
              }}
              style={{backgroundColor: lightBlue, color: 'white'}}
            >Done</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
