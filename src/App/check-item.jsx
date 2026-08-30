import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChecklistWrapper, colorList } from "./styled-components";

const ColoredCheckbox = styled((props) => (
  <Checkbox color="default" {...props} />
))({
  color: colorList.cornflower,
  "&.Mui-checked": {
    color: colorList.lightBlue,
  },
});

const CheckItems = (props) => {
  const {list, isChecked, changeCheck} = props;
  return (
    <ChecklistWrapper>
      {list.map(cho => (
        <FormControlLabel
          key={`FormControl-${cho}-${isChecked ? "Checked" : "Unchecked"}`}
          control={
            <ColoredCheckbox
              key={`${isChecked ? "checked" : "unchecked"}-${cho}`}
              checked={isChecked}
              onChange={() => {
               changeCheck(cho, isChecked); 
              }}
              name={cho}
            />
          }
          label={cho}
          style={{
            color: isChecked ? colorList.lightBlue : colorList.cornflower,
          }}
        />)
      )}
    </ChecklistWrapper>
  );
};

export default CheckItems;
