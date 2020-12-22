import React, { useState } from "react";
import OptionForm from "./OptionForm";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function PickerOptions(props) {
  const { component, quest, toggleRefetch, close } = props;
  const history = useHistory();

  const handleCreate = option => {
    fetch(`${process.env.REACT_APP_API_URL}/admin/quests/component-options`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(option)
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
        close();
      })
      .catch(err => {
        console.error("Option creation error:", err);
      });
  };

  const handleUpdate = option => {
    fetch(
      `${process.env.REACT_APP_API_URL}/admin/quests/component-options/${option.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(option)
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
        console.log("Option updated");
        toggleRefetch();
      })
      .catch(err => {
        console.error("Option update error:", err);
      });
  };

  return (
    <div>
      <Typography variant="h6">Options</Typography>
      {component.step_component_options.map(option => (
        <OptionForm
          optionToEdit={option}
          quest={quest}
          component={component}
          key={option.id}
          submit={handleUpdate}
        />
      ))}
      <Typography variant="h6">Add Option:</Typography>
      <OptionForm
        quest={quest}
        component={component}
        submit={handleCreate}
        key={0}
      />
    </div>
  );
}

export default PickerOptions;
