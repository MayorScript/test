import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import FinishItem from "./FinishItem";

const useStyles = makeStyles((theme) => ({
  options: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  option: {
    height: "200px",
    marginRight: theme.spacing(2),
  },
  action: {
    margin: "10px auto",
  },
}));

function Finishes(props) {
  const classes = useStyles();
  const { quest, toggleRefetch } = props;
  const [showInputs, setShow] = useState(false);

  const renderInputs = () => {
    let inputs = [];
    quest.steps.forEach((step) => {
      let inputsInStep = step.components.filter(
        (el) => el.type === "INPUT_COMP"
      );
      if (inputsInStep.length > 0) {
        inputsInStep.forEach((el) => {
          inputs.push({ step: step.title, input: el });
        });
      }
    });
    return (
      <ul>
        {inputs.map((input) => (
          <li>
            Step title: {input.step}, Content field (placeholder):{" "}
            {input.input.content}, ID: <b>{input.input.id}</b>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Finishes section
      </Typography>
      {quest.type === "reflection" ? null : (
        <>
          <Typography variant="subtitle1" gutterBottom>
            To add answer from some input to textbox component - type:{" "}
            <code>[[[id of component]]]</code> See IDs below
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShow(!showInputs)}
          >
            {showInputs ? "Hide" : "Show"}
          </Button>
          {showInputs ? renderInputs() : null}
        </>
      )}
      {quest.finishes
        ? quest.finishes.map((finish, key) => (
            <FinishItem
              finish={finish}
              key={key}
              toggleRefetch={toggleRefetch}
            />
          ))
        : "No finishes"}
    </div>
  );
}

export default Finishes;
