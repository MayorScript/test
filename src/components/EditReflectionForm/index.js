import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: "1",
    flexDirection: "column",
    minWidth: "300px",
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  input: {
    display: "none"
  },
  fileInput: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1)
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  action: {
    margin: theme.spacing(1)
  }
}));

function EditReflectionForm(props) {
  const classes = useStyles();
  const { step, quest, submit, cancel } = props;
  const [stepData, setStepData] = useState(
    step
      ? step
      : {
          parent_id: "",
          type: "grouped"
        }
  );
  const [editing, setEditing] = useState(false);

  const handleChange = event => {
    if (!editing) {
      setEditing(true);
    }
    setStepData({
      ...stepData,
      [event.target.name]: event.target.value
    });
  };

  const options = quest.steps.map(step => {
    return {
      label: step.title,
      value: step.id
    };
  });

  return (
    <div className={classes.root}>
      <form className={classes.form} autoComplete="off">
        <TextField
          id="title"
          label="Title"
          name="title"
          onChange={handleChange}
          value={stepData.title}
        />
        <InputLabel htmlFor="parent_id">Parent</InputLabel>
        <Select
          value={stepData.parent_id}
          onChange={handleChange}
          inputProps={{
            name: "parent_id",
            id: "parent_id"
          }}
        >
          <MenuItem value={""}>None</MenuItem>
          {options.map((option, key) => (
            <MenuItem value={option.value} key={key}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <InputLabel htmlFor="type">Reflection type</InputLabel>
        <Select
          value={stepData.type}
          onChange={handleChange}
          inputProps={{
            name: "type",
            id: "type"
          }}
        >
          <MenuItem value={"grouped"}>Grouped</MenuItem>
          <MenuItem value={"max"}>Max</MenuItem>
        </Select>
        <TextField
          id="period"
          type="number"
          label="Period"
          name="period"
          onChange={handleChange}
          value={stepData.period}
        />
      </form>
      <div className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => submit(stepData)}
          className={classes.action}
          disabled={!editing}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={cancel}
          className={classes.action}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default EditReflectionForm;
