import React from "react";
import {
  Input,
  InputAdornment,
} from "@material-ui/core";
import { PeachButton, colorList} from "../styled-components";


const EditingBox = (props) => {
    const {allChores, chore, setChores, idx, placeholder} = props;
  return (
    <Input
      id={`oneItem${chore}`}
      disableUnderline={true}
      style={{
        color: colorList.cornflower,
      }}
      multiline
      fullWidth
      defaultValue={chore || null}
      placeholder={placeholder || null}
      endAdornment={
        <InputAdornment position="end">
          <PeachButton
            onClick={(e) => {
              document.getElementById(`oneItem${chore}`).value = "";
            }}
          >
            Clear
          </PeachButton>
          <PeachButton
            onClick={(e) => {
              const choresCopy = [...allChores];
              choresCopy[idx] = document.getElementById(`oneItem${chore}`).value;
              setChores(choresCopy);
              document.getElementById(`oneItem${chore}`).value = "";
            }}
          >
            Save
          </PeachButton>
        </InputAdornment>
      }
    />
  );
};
export default EditingBox;
