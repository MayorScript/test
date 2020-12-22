import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import EditReflectionForm from "../../../../components/EditReflectionForm";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  content: {
    width: "100%"
  }
}));

function ReflectionItem(props) {
  const classes = useStyles();
  const history = useHistory();
  const { step, quest, toggleRefetch } = props;

  const updateReflection = stepData => {
    if (!stepData.parent_id) {
      delete stepData.parent_id;
    }
    fetch(
      `${process.env.REACT_APP_API_URL}/admin/quests/${quest.id}/steps/${stepData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(stepData)
      }
    )
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
      })
      .catch(err => {
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
          <EditReflectionForm
            step={step}
            quest={quest}
            submit={updateReflection}
          />
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default ReflectionItem;
