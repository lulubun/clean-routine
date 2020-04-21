import React, {useState} from 'react';
import { Checkbox, Input, Button, FormControlLabel, Modal, TextField, List, ListItem } from '@material-ui/core';
import './App.css';
import list from './first-list.json'

function Weekly({wks, setmodal}) {
    console.log("Weekly -> wks", wks);
    const [weeks, setweeks] = useState(wks);
    return(
        <div style={{margin: '50px 30% auto 30%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', flexDirection: 'column', paddingBottom: 10}}>
            <List>
                {weeks.map((w, i) =>
                    <ListItem key={`weekly${w}`} >
                        <TextField multiline fullWidth defaultValue={w} onChange={(v) => {
                            console.log("Weekly -> v", v.target.value)
                        }} />
                    </ListItem>
                )}
            </List>
            <Button onClick={() => setmodal(false)}>CLOSE</Button>
        </div>
    )
}

export default Weekly;