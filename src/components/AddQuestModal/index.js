import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    margin: "10px 0"
  }
}));

function AddQuestModal(props) {
  const classes = useStyles();
  const history = useHistory();
  const { open, toggleModal } = props;
  const [questInfo, setQuestInfo] = useState({
    title: "",
    type: "quiz",
    price: 100,
    reward: 25,
    finishes_count: "1"
  });

  const handleClose = () => {
    setQuestInfo({
      title: "",
      type: "quiz",
      price: 100,
      reward: 25,
      finishes_count: "1"
    });
    toggleModal();
  };

  const handleChange = event => {
    setQuestInfo({
      ...questInfo,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_API_URL}/admin/quests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(questInfo)
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
        history.push(`/quests/${res.id}`);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Quest</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create new quest, please fill the form below. Make sure that you
          type correct Finishes Count.
        </DialogContentText>
        <form className={classes.form}>
          <TextField
            id="title"
            name="title"
            label="Title"
            type="text"
            value={questInfo.title}
            onChange={handleChange}
            className={classes.input}
          />
          <div className={classes.input}>
            <InputLabel htmlFor="type">Type</InputLabel>
            <Select
              value={questInfo.type}
              onChange={handleChange}
              inputProps={{
                name: "type",
                id: "type"
              }}
              required
            >
              <MenuItem value={"quiz"}>Quiz</MenuItem>
              <MenuItem value={"reflection"}>Reflection</MenuItem>
            </Select>
          </div>
          <div className={classes.input}>
            <InputLabel htmlFor="reward">Reward</InputLabel>
            <Select
              value={questInfo.reward}
              onChange={handleChange}
              inputProps={{
                name: "reward",
                id: "reward"
              }}
              required
            >
              <MenuItem value={"25"}>25</MenuItem>
              <MenuItem value={"50"}>50</MenuItem>
              <MenuItem value={"75"}>75</MenuItem>
            </Select>
          </div>
          <TextField
            className={classes.input}
            id="finishes_count"
            name="finishes_count"
            label="Finishes Count"
            type="number"
            value={
              questInfo.type === "reflection" ? "0" : questInfo.finishes_count
            }
            onChange={handleChange}
            disabled={questInfo.type === "reflection"}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddQuestModal;
