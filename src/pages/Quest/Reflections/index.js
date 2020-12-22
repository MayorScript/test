import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ReflectionItem from "./ReflectionItem";
import Button from "@material-ui/core/Button";
import EditReflectionForm from "../../../components/EditReflectionForm";

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

function Reflections(props) {
  const classes = useStyles();
  const history = useHistory();
  const { quest, toggleRefetch } = props;
  const [add, setAdd] = useState(false);

  const createReflection = data => {
    if (!data.parent_id) {
      delete data.parent_id;
    }
    fetch(`${process.env.REACT_APP_API_URL}/admin/quests/${quest.id}/steps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
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
        Reflections section
      </Typography>

      {quest.steps
        ? quest.steps.map((step, index) => (
            <ReflectionItem
              step={step}
              key={index}
              quest={quest}
              toggleRefetch={toggleRefetch}
            />
          ))
        : null}
      {add ? (
        <EditReflectionForm
          quest={quest}
          submit={createReflection}
          cancel={cancel}
        />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAdd(true)}
          className={classes.addButton}
        >
          Add Reflection
        </Button>
      )}
    </div>
  );
}

export default Reflections;
