import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import EditStepForm from "../../../../components/EditStepForm";
import Builder from "../../../../components/Builder";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  content: {
    width: "100%",
  },
}));

function StepItem(props) {
  const classes = useStyles();
  const history = useHistory();
  const { step, quest, toggleRefetch } = props;

  const updateStep = (stepData) => {
    if (!stepData.parent_id) {
      delete stepData.parent_id;
    }
    fetch(
      `${process.env.REACT_APP_API_URL}/admin/quests/${quest.id}/steps/${stepData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(stepData),
      }
    )
      .then((res) => {
        if (res.status === 401) {
          alert("Your session expired or you don't have admin rights");
          localStorage.removeItem("MS_loggedIn");
          history.push("/");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        toggleRefetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`finish-${step.id}-content`}
        id={`finish-${step.id}-header`}
      >
        <Typography className={classes.heading}>{step.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.content}>
          <EditStepForm
            step={step}
            quest={quest}
            submit={updateStep}
            toggleRefetch={toggleRefetch}
          />
          <span>Step Components</span>
          <Builder
            stage="steps"
            components={step.components}
            step_id={step.id}
            toggleRefetch={toggleRefetch}
            quest={quest}
          />
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default StepItem;
