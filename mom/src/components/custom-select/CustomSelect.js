import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
export default function CustomSelect(props) {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    props.value && props.onChange(props.value, props.name);
  }, [props.value])

  const handleChange = event => {
    setSelectedValue(event.target.value);
    props.onChange(event.target.value, event.target.name);
  };

  return (
    <FormControl variant={props.variant} size={props.size} margin={props.formControlMargin} className={props.formControlClassName} fullWidth={props.fullWidth} disabled={props.disabled}>
      <InputLabel >{props.label}</InputLabel>
      <Select
        value={selectedValue || props.value || ""}
        onChange={handleChange}
        name={props.name}
        className={props.className}
      >
        props.showDisabledOption && <MenuItem value="" disabled={props.disabledOptionSelectable}>{props.disabledOptionText}</MenuItem>
        {props.options.map((option, index) => <MenuItem key={index} value={option.value}>{option.label}</MenuItem>)}
      </Select>
    </FormControl>
  )
}

CustomSelect.propTypes = {
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledOptionText: PropTypes.string,
  showDisabledOption: PropTypes.bool,
  size: PropTypes.string,
  multiple: PropTypes.bool,
  className: PropTypes.string,
  formControlClassName: PropTypes.string,
  disabledOptionSelectable: PropTypes.bool
};

CustomSelect.defaultProps = {
  variant: "outlined",
  fullWidth: false,
  disabled: false,
  disabledOptionText: "Please Select One",
  showDisabledOption: true,
  size: "medium",
  multiple: false,
  className: "customSelect",
  formControlClassName: "form-control-select",
  disabledOptionSelectable: false
};