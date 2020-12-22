import React, { useState } from "react";
import BuilderComponent from "./BuilderComponent";
import EditComponent from "./EditComponent";
import { useHistory } from "react-router-dom";

// MUI related inputs
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";

import {
  QUEST_DETAILS_COMPONENTS_TYPES,
  QUEST_STEPS_COMPONENTS_TYPES,
  QUEST_FINISHES_COMPONENTS_TYPES
} from "../../constants/ComponentTypes";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  componentsList: {
    width: "400px"
  }
}));

function Builder(props) {
  const classes = useStyles();
  const history = useHistory();
  const { stage, components, toggleRefetch, quest } = props;
  const [add, setAdd] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);
  const sortedComponents = components.sort(
    (a, b) => a.seq_number - b.seq_number
  );

  const sortingObject = {};
  components.forEach(el => {
    sortingObject[el.id] = el.seq_number;
  });

  const moveDown = component => {
    const currentPosition = sortedComponents.findIndex(
      el => el.id === component.id
    );
    const nextElementId = sortedComponents[currentPosition + 1].id;

    sortingObject[component.id] += 1;
    sortingObject[nextElementId] -= 1;

    fetch(`${process.env.REACT_APP_API_URL}/admin/quests/components/sequence`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(sortingObject)
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
        toggleRefetch();
      })
      .catch(err => {
        console.error("Ordering update error:", err);
      });
  };

  const moveUp = component => {
    const currentPosition = sortedComponents.findIndex(
      el => el.id === component.id
    );
    const prevElementId = sortedComponents[currentPosition - 1].id;

    sortingObject[component.id] -= 1;
    sortingObject[prevElementId] += 1;

    fetch(`${process.env.REACT_APP_API_URL}/admin/quests/components/sequence`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(sortingObject)
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
        toggleRefetch();
      })
      .catch(err => {
        console.error("Ordering update error:", err);
      });
  };

  const handleFormClose = () => {
    setAdd(false);
  };

  const handleFormSubmit = component => {
    const requestBody = {
      ...component,
      seq_number: components.length,
      quest_id: props.quest_id ? props.quest_id : null,
      step_id: props.step_id ? props.step_id : null,
      finish_id: props.finish_id ? props.finish_id : null
    };

    fetch(`${process.env.REACT_APP_API_URL}/admin/quests/components`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(requestBody)
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
        toggleRefetch();
        handleFormClose();
      })
      .catch(err => {
        console.error("Component creation error:", err);
      });
  };

  let componentTypeOptions = stage
    ? (stage === "details" && QUEST_DETAILS_COMPONENTS_TYPES) ||
      (stage === "steps" && QUEST_STEPS_COMPONENTS_TYPES) ||
      (stage === "finishes" && QUEST_FINISHES_COMPONENTS_TYPES)
    : QUEST_DETAILS_COMPONENTS_TYPES;

  return (
    <Container className={classes.root}>
      <List className={classes.componentsList}>
        {sortedComponents.map((component, index) => (
          <BuilderComponent
            component={component}
            key={index}
            componentTypeOptions={componentTypeOptions}
            toggleRefetch={toggleRefetch}
            length={components.length}
            moveDown={moveDown}
            moveUp={moveUp}
            quest={quest}
          />
        ))}
      </List>
      {add ? (
        <EditComponent
          componentTypeOptions={componentTypeOptions}
          submit={handleFormSubmit}
          cancel={handleFormClose}
          quest={quest}
          toggleRefetch={toggleRefetch}
        />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAdd(true)}
        >
          Add Component
        </Button>
      )}
    </Container>
  );
}

export default Builder;
