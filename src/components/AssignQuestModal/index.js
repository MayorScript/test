import React, { useState, useEffect } from "react";

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
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0",
  },
}));

function AssignQuestModal(props) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { open, toggleModal, usersList, dropSelection } = props;
  const [selectedQuestId, setSelectedQuest] = useState(undefined);
  const [refetchQuests, setRefetchQuests] = useState(true);
  const [questsList, setQuests] = useState([]);

  useEffect(() => {
    if (refetchQuests) {
      fetch(`${process.env.REACT_APP_API_URL}/admin/quests`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 401) {
            alert("Your session expired or you don't have admin rights");
            localStorage.removeItem("MS_loggedIn");
            history.push("/");
          }
          return res.json();
        })
        .then((res) => {
          const filtered = res.filter((el) => el.status === "published");
          setQuests(filtered);
          setRefetchQuests(false);
        })
        .catch((err) => {
          console.error("Error in fetch:", err);
        });
    }
  }, [refetchQuests]);

  const handleClose = () => {
    setQuests([]);
    toggleModal();
    dropSelection();
  };

  const handleSubmit = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/admin/user-quests/${selectedQuestId}/assign`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(usersList),
      }
    )
      .then((res) => {
        if (res.status === 401) {
          alert("Your session expired or you don't have admin rights");
          localStorage.removeItem("MS_loggedIn");
          history.push("/");
        }
        return res.text();
      })
      .then((res) => {
        enqueueSnackbar("Successfully assigned the quest!", {
          variant: "success",
        });
        handleClose();
      })
      .catch((err) => {
        enqueueSnackbar(`${err}`, { variant: "error" });
        handleClose();
      });
  };

  const handleChange = (event) => {
    setSelectedQuest(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Assign quest to {usersList.length} users
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select quest to assign from the Select below
          <Button onClick={() => setRefetchQuests(true)} color="default">
            Refetch Quests
          </Button>
        </DialogContentText>
        <form className={classes.form}>
          <div className={classes.input}>
            <InputLabel htmlFor="type">Quest</InputLabel>
            <Select
              value={selectedQuestId}
              onChange={handleChange}
              inputProps={{
                name: "quest",
                id: "quest",
                detailPanelType: "multiple"
              }}
              required
            >
              <MenuItem value={undefined}>None</MenuItem>
              {questsList.map((el, key) => (
                <MenuItem value={el.id} key={key}>
                  {el.title}
                </MenuItem>
              ))}
            </Select>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!selectedQuestId}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AssignQuestModal;
