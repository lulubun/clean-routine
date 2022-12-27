import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ChecklistWrapper, colorList } from "./styled-components";

const ColoredCheckbox = withStyles({
  root: {
    color: colorList.cornflower,
    "&$checked": {
      color: colorList.lightBlue,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
