import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Conditions from "../Conditions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: "1",
    flexDirection: "column",
    minWidth: "300px",
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    display: "none",
  },
  fileInput: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  action: {
    margin: theme.spacing(1),
  },
  previewBlock: {
    display: "flex",
  },
  imagePreview: {
    width: "80px",
    height: "auto",
    margin: theme.spacing(1),
  },
}));

function EditStepForm(props) {
  const classes = useStyles();
  const { step, quest, submit, toggleRefetch } = props;
  const [stepData, setStepData] = useState(step ? step : {});
  const [editing, setEditing] = useState(false);

  const handleChange = (event) => {
    if (!editing) {
      setEditing(true);
    }
    setStepData({
      ...stepData,
      [event.target.name]: event.target.value,
    });
  };

  const options = quest.steps.map((step) => {
    return {
      label: step.title,
      value: step.id,
    };
  });

  const setConditionsToStep = (condition) => {
    if (!editing) {
      setEditing(true);
    }
    let newCoditions = [];
    if (Array.isArray(stepData.conditions)) {
      newCoditions = [...stepData.conditions, condition];
    } else {
      newCoditions = [condition];
    }
    setStepData({
      ...stepData,
      conditions: newCoditions,
    });
  };

  const findPicker = () => {
    let picker;

    const parentStep = quest.steps.find((el) => el.id === stepData.parent_id);
    parentStep.components.forEach((component) => {
      if (
        component.type === "SINGLE_PICKER" ||
        component.type === "MULTI_PICKER"
      ) {
        picker = component;
      }
    });

    if (picker && Object.keys(picker).length > 0) {
      return picker;
    } else {
      return null;
    }
  };

  const renderConditions = () => {
    if (!stepData.parent_id) {
      return null;
    } else if (
      Array.isArray(stepData.conditions) &&
      stepData.conditions.length > 0 &&
      findPicker()
    ) {
      return (
        <Conditions
          quest={quest}
          picker={findPicker()}
          conditions={stepData.conditions}
          setConditionsToStep={setConditionsToStep}
        />
      );
    } else if (findPicker()) {
      return (
        <Conditions
          quest={quest}
          picker={findPicker()}
          conditions={[]}
          setConditionsToStep={setConditionsToStep}
        />
      );
    } else {
      return null;
    }
  };

  const handleDelete = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/admin/quests/${quest.id}/steps/${stepData.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    )
      .then((res) => res.text())
      .then((res) => {
        toggleRefetch();
      })
      .catch((err) => {
        console.error("Step deletion error:", err);
      });
  };

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
            id: "parent_id",
          }}
        >
          <MenuItem value={""}>None</MenuItem>
          {options.map((option, key) => (
            <MenuItem value={option.value} key={key}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {renderConditions()}
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
          onClick={handleDelete}
          className={classes.action}
          disabled={!stepData.id}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

EditStepForm.propTypes = {};

export default EditStepForm;
