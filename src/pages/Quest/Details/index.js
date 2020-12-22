import React from "react";
import Builder from "../../../components/Builder";

import Typography from "@material-ui/core/Typography";

function Details(props) {
  const { quest, toggleRefetch } = props;
  return (
    <div>
      {Object.keys(quest).length !== 0 ? (
        <>
          <Typography variant="h3" gutterBottom>
            {quest.title}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Details section
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Type: {quest.type}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Reward: {quest.reward}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Finishes Count: {quest.finishes.length}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Details components list
          </Typography>
          <Builder
            stage="details"
            components={quest.components}
            quest_id={quest.id}
            toggleRefetch={toggleRefetch}
            quest={quest}
          />
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default Details;
