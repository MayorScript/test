import React from "react";
import Builder from "../../../../components/Builder";

import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

function FinishItem(props) {
  const classes = useStyles();
  const { finish, toggleRefetch } = props;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`finish-${finish.id}-content`}
        id={`finish-${finish.id}-header`}
      >
        <Typography className={classes.heading}>{finish.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          <Typography>Fill this finish with some component</Typography>
          <Builder
            stage="finishes"
            components={finish.components}
            finish_id={finish.id}
            toggleRefetch={toggleRefetch}
          />
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default FinishItem;
