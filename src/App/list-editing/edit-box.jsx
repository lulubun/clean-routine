import React from "react";
import {
  Input,
  InputAdornment,
  InputLabel,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { PeachButton, colorList} from "../styled-components";
import { Form } from "lucide-react";


const EditingBox = (props) => {
    const {chore, choreKind, setChores} = props;
    const [editingChore, setEditingChore] = React.useState(chore || "");
  return (
    <div style={{width: "100%"}}>
      <InputLabel htmlFor={`oneItem${chore}`} style={{color: colorList.lavenderGray, fontSize: "0.8em"}}>
        Add a new Chore
      </InputLabel>
    <Input
      onChange={(e) => {
        setEditingChore(e.target.value);
      }}
      id={`oneItem${chore}`}
      disableUnderline={true}
      style={{
        color: colorList.lavenderGray,
        maxWidth: "50%",
        border: `1px solid ${colorList.lightBlue}`,
        borderRadius: "5px",
        padding: "5px",
        margin: "5px",
      }}
      variant="outlined"
      size="small"
      multiline
      value={editingChore}
      endAdornment={
        <InputAdornment position="end">
          <PeachButton
            onClick={(e) => {
              setEditingChore("");
            }}
          >
            Clear
          </PeachButton>
          <PeachButton
            onClick={(e) => {
              setChores(editingChore);
            }}
          >
            Save
          </PeachButton>
        </InputAdornment>
      }
    />
    <FormLabel htmlFor={`oneItem${chore}`} style={{color: colorList.lavenderGray, fontSize: "0.8em"}}>Rotation Schedule</FormLabel>
    <FormControl>
      <RadioGroup
        defaultValue={choreKind || "daily"}
      >
        <FormControlLabel value="daily" control={<Form.Radio />} label="Daily" />
        <FormControlLabel value="weekly" control={<Form.Radio />} label="Weekly" />
        <FormControlLabel value="biweekly" control={<Form.Radio />} label="BiWeekly" />
        <FormControlLabel value="monthly" control={<Form.Radio />} label="Monthly" />
        <FormControlLabel value="yearly" control={<Form.Radio />} label="Yearly" />
        <FormControlLabel value="custom" control={<Form.Radio />} label="Custom" />
      </RadioGroup>
    </FormControl>
  </div>
  );
};
export default EditingBox;
