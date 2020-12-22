import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  input: {
    display: "none"
  },
  fileInput: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1)
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  action: {
    margin: theme.spacing(1)
  },
  previewBlock: {
    display: "flex"
  },
  imagePreview: {
    width: "80px",
    height: "auto",
    margin: theme.spacing(1)
  },
  values: {
    display: "flex"
  }
}));

function OptionForm(props) {
  const classes = useStyles();
  const { optionToEdit, quest, component, submit } = props;
  const values = {};
  quest.finishes.forEach(finish => {
    values[finish.aspect] = 0;
  });

  const [option, setOption] = useState(
    optionToEdit
      ? optionToEdit
      : {
          component_id: component.id,
          values
        }
  );

  const handleValueFieldChange = event => {
    setOption({
      ...option,
      values: {
        ...option.values,
        [event.target.name]: parseInt(event.target.value, 10)
      }
    });
  };

  const handleFileAdd = e => {
    console.log(e.target.files[0]);
    // handle upload here & getLink
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    fetch(`${process.env.REACT_APP_API_URL}/bucket`, {
      method: "POST",
      credentials: "include",
      body: formData
    })
      .then(res => res.text())
      .then(res => {
        const link = res;
        setOption({
          ...option,
          url: link
        });
      })
      .catch(err => {
        console.error("File Upload error:", err);
      });
  };
  const inputId = uuidv4();

  return (
    <form>
      <input
        accept="image/*"
        className={classes.input}
        type="file"
        id={inputId}
        style={{ display: "none" }}
        onChange={handleFileAdd}
      />
      <label htmlFor={inputId} className={classes.fileInput}>
        <Typography variant="subtitle1">
          {optionToEdit ? "Update file" : "Add file"}
        </Typography>
        <Button component="span" className={classes.button}>
          Upload
        </Button>
      </label>
      <div className={classes.previewBlock}>
        {option.url ? (
          <img
            src={option.url}
            alt="preview"
            className={classes.imagePreview}
          />
        ) : null}
      </div>
      <div className={classes.values}>
        {Object.keys(option.values).map((value, key) => (
          <TextField
            id={`Value-${value}`}
            label={`Value for finish ${value}`}
            name={value}
            onChange={handleValueFieldChange}
            value={option.values[value]}
            type="number"
            step="0.01"
            key={key}
          />
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => submit(option)}
        className={classes.action}
      >
        {optionToEdit ? "Update" : "Add"}
      </Button>
    </form>
  );
}

export default OptionForm;
