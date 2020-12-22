import React, { useState } from "react";
import EditComponent from "../EditComponent";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    padding: "0 50px"
  },
  orderControl: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)"
  },
  liftButton: {
    right: 0
  },
  sinkButton: {
    left: 0
  }
}));

function BuilderItem(props) {
  const classes = useStyles();
  const history = useHistory();
  const {
    component,
    componentTypeOptions,
    toggleRefetch,
    length,
    moveDown,
    moveUp,
    quest
  } = props;
  const [edit, setEdit] = useState(false);

  const handleFormClose = () => {
    setEdit(false);
  };

  const handleFormSubmit = component => {
    fetch(
      `${process.env.REACT_APP_API_URL}/admin/quests/components/${component.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(component)
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
        toggleRefetch();
        handleFormClose();
      })
      .catch(err => {
        console.error("Component creation error:", err);
      });
  };

  return (
    <div className={classes.root}>
      <ListItem button onClick={() => setEdit(!edit)}>
        <ListItemText
          primary={component.type}
          secondary={
            component.content
              ? `${component.content.substring(0, 15)}...`
              : null
          }
        />
      </ListItem>
      <IconButton
        edge="end"
        aria-label="lift-component"
        className={`${classes.orderControl} ${classes.liftButton}`}
        disabled={component.seq_number === 0}
        onClick={() => moveUp(component)}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
      <IconButton
        edge="end"
        aria-label="sink-component"
        className={`${classes.orderControl} ${classes.sinkButton}`}
        disabled={component.seq_number === length - 1}
        onClick={() => moveDown(component)}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
      {edit ? (
        <EditComponent
          componentToEdit={component}
          componentTypeOptions={componentTypeOptions}
          submit={handleFormSubmit}
          cancel={handleFormClose}
          quest={quest}
          toggleRefetch={toggleRefetch}
        />
      ) : null}
    </div>
  );
}

export default BuilderItem;
