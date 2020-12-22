import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StepItem from "./StepItem";
import Button from "@material-ui/core/Button";
import EditStepForm from "../../../components/EditStepForm";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  addButton: {
    alignSelf: "center",
    marginTop: theme.spacing(2)
  }
}));

function Steps(props) {
  const classes = useStyles();
  const history = useHistory();
  const { quest, toggleRefetch } = props;
  const [add, setAdd] = useState(false);

  const createStep = stepData => {
    if (!stepData.parent_id) {
      delete stepData.parent_id;
    }
    fetch(`${process.env.REACT_APP_API_URL}/admin/quests/${quest.id}/steps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(stepData)
    })
      .then(res => {
        if (res.status === 401) {
          alert("Your session expired or you don't have admin rights");
          localStorage.removeItem("MS_loggedIn");
          history.push("/");
        }
        return res.json();
      })
      .then(res => {
        console.log(res);
        toggleRefetch();
        cancel();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const cancel = () => {
    setAdd(false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Steps section
      </Typography>

      {quest.steps
        ? quest.steps.map((step, index) => (
            <StepItem
              step={step}
              key={index}
              quest={quest}
              toggleRefetch={toggleRefetch}
            />
          ))
        : null}
      {add ? (
        <EditStepForm quest={quest} submit={createStep} cancel={cancel} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAdd(true)}
          className={classes.addButton}
        >
          Add step
        </Button>
      )}
    </div>
  );
}

export default Steps;
