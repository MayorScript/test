import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  options: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  option: {
    height: "200px",
    marginRight: theme.spacing(2)
  },
  action: {
    margin: "10px auto"
  }
}));

function ConditionForm(props) {
  const classes = useStyles();
  const { condition, picker, disabled, addCondition, add } = props;
  const [conditionState, setCondition] = useState(condition);

  const isMultiple = picker.type === "MULTI_PICKER";
  const handleSelect = event => {
    if (!isMultiple) {
      console.log("here", event.target.name);
      setCondition([event.target.name]);
    } else if (conditionState.includes(event.target.name)) {
      const newState = conditionState.filter(el => el !== event.target.name);
      setCondition(newState);
    } else {
      setCondition([...conditionState, event.target.name]);
    }
  };

  return (
    <>
      <div className={classes.options}>
        {picker.step_component_options.map((option, key) => {
          return (
            <div>
              <input
                type="checkbox"
                id={`conditionOption-${option.id}`}
                name={option.id}
                checked={conditionState.includes(option.id.toString())}
                onClick={handleSelect}
                disabled={disabled}
              />
              <label for={`conditionOption-${option.id}`}>
                <img
                  src={option.url}
                  alt="option"
                  style={{ height: "200px" }}
                />
              </label>
            </div>
          );
        })}
      </div>
      {add ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => addCondition(conditionState)}
          className={classes.action}
        >
          Submit
        </Button>
      ) : null}
      <Divider />
    </>
  );
}

export default ConditionForm;
