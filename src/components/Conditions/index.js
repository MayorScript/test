import React from "react";
import ConditionForm from "./ConditionForm";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  conditions: {
    display: "flex",
    flexDirection: "column"
  }
}));

function Conditions(props) {
  const classes = useStyles();
  const { quest, conditions, picker, setConditionsToStep } = props;

  const addCondition = condition => {
    setConditionsToStep(condition);
  };

  return (
    <div>
      <div className={classes.conditions}>
        {conditions.length > 0 ? (
          <Typography variant="h6" gutterBottom>
            Existing conditions:
          </Typography>
        ) : null}
        {conditions.length > 0
          ? conditions.map((condition, index) => (
              <ConditionForm
                condition={condition}
                key={index}
                quest={quest}
                picker={picker}
                disabled
              />
            ))
          : null}
      </div>
      <Typography variant="h6" gutterBottom>
        Add condition:
      </Typography>
      <ConditionForm
        quest={quest}
        picker={picker}
        condition={[]}
        addCondition={addCondition}
        add
      />
    </div>
  );
}

export default Conditions;
