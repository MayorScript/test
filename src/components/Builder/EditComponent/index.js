import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { isEmpty } from "../../../utils/isEmpty";
import { Typography } from "@material-ui/core";
import PickerOptions from "./PickerOptions";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const textTypes = ["TITLE_COMP", "TEXTBOX_COMP", "QUOTE_COMP"];
const fileTypes = [
  "IMAGE_COMP",
  "VIDEO_COMP",
  "SOUND_COMP",
  "IMAGE_CAROUSEL",
  "ANIMATION",
];
const pickerTypes = ["SINGLE_PICKER", "MULTI_PICKER"];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    display: "none",
  },
  fileInput: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  action: {
    margin: theme.spacing(1),
  },
  previewBlock: {
    display: "flex",
  },
  imagePreview: {
    width: "80px",
    height: "auto",
    margin: theme.spacing(1),
  },
}));

function EditComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const {
    componentToEdit,
    componentTypeOptions,
    submit,
    cancel,
    quest,
    toggleRefetch,
  } = props;
  const edititng = componentToEdit && !isEmpty(componentToEdit);
  const [component, setComponent] = useState(
    componentToEdit ? componentToEdit : {}
  );

  const handleChange = (event) => {
    setComponent({
      ...component,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/admin/quests/components/${componentToEdit.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    )
      .then((res) => {
        if (res.status === 401) {
          enqueueSnackbar(
            "Your session expired or you don't have admin rights",
            { variant: "error" }
          );
          localStorage.removeItem("MS_loggedIn");
          history.push("/");
        }
        if (res.status === 400) {
          enqueueSnackbar("Can't update published or archived quest", {
            variant: "error",
          });
          localStorage.removeItem("MS_loggedIn");
          history.push("/");
        }
        return res.text();
      })
      .then((res) => {
        toggleRefetch();
      })
      .catch((err) => {
        console.error("Component Delete error ror:", err);
      });
  };

  const handleFileAdd = (e) => {
    console.log(e.target.files[0]);
    // handle upload here & getLink
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    fetch(`${process.env.REACT_APP_API_URL}/bucket`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.text())
      .then((res) => {
        const link = res;
        const newUrls = component.url ? [...component.url, link] : [link];
        setComponent({
          ...component,
          url: newUrls,
        });
      })
      .catch((err) => {
        console.error("File Upload error:", err);
      });
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="type">Type</InputLabel>
          <Select
            value={component.type}
            onChange={handleChange}
            inputProps={{
              name: "type",
              id: "type",
            }}
            required
          >
            <MenuItem value={""}>None</MenuItem>
            {componentTypeOptions.map((option, key) => (
              <MenuItem value={option} key={key}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id="content"
            label="Content"
            name="content"
            onChange={handleChange}
            value={component.content}
          />
          {fileTypes.includes(component.type) ? (
            <>
              <input
                accept="image/*"
                className={classes.input}
                id="files"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileAdd}
              />
              <label htmlFor="files" className={classes.fileInput}>
                <Typography variant="subtitle1">Add file(s):</Typography>
                <Button component="span" className={classes.button}>
                  Upload
                </Button>
              </label>
              <div className={classes.previewBlock}>
                {component.url
                  ? component.url.map((url, key) => (
                      <img
                        src={url}
                        key={key}
                        alt="preview"
                        className={classes.imagePreview}
                      />
                    ))
                  : null}
              </div>
            </>
          ) : null}
        </FormControl>
      </form>
      {componentToEdit && pickerTypes.includes(componentToEdit.type) ? (
        <PickerOptions
          component={component}
          quest={quest}
          toggleRefetch={toggleRefetch}
          close={cancel}
        />
      ) : null}
      <div className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => submit(component)}
          className={classes.action}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          className={classes.action}
          disabled={!edititng}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default EditComponent;
