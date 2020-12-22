import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";

import AddQuestModal from "../../components/AddQuestModal";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function QuestsTable() {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpened, setModalState] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const [data, setData] = useState([]);

  const toggleModal = () => {
    setModalState(!modalOpened);
  };

  useEffect(() => {
    if (refetch) {
      fetch(`${process.env.REACT_APP_API_URL}/admin/quests`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 401) {
            enqueueSnackbar(
              "Your session expired or you don't have admin rights",
              { variant: "error" }
            );
            localStorage.removeItem("MS_loggedIn");
            history.push("/");
          }
          return res.json();
        })
        .then((res) => {
          setData(res);
          setRefetch(false);
        })
        .catch((err) => {
          console.error("Error in fetch:", err);
        });
    }
  }, [refetch, history]);

  const publishQuest = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/admin/quests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        status: "published",
      }),
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
        setRefetch(true);
      })
      .catch((err) => {
        console.error("Publish error: ", err);
      });
  };

  const deleteQuest = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/admin/quests/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          enqueueSnackbar(
            "Your session expired or you don't have admin rights",
            { variant: "error" }
          );
          localStorage.removeItem("MS_loggedIn");
          history.push("/");
        }
        return res.json();
      })
      .then((res) => {
        enqueueSnackbar("Quest was successfully archived", {
          variant: "success",
        });
        setRefetch(true);
      })
      .catch((err) => {
        console.error("Delete error: ", err);
      });
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={[
          { title: "Title", field: "title" },
          { title: "Type", field: "type" },
          { title: "Status", field: "status" },
          { title: "Created", field: "created_at" },
          {
            title: "Reward",
            field: "reward",
            type: "numeric",
          },
        ]}
        data={data}
        title="Quests"
        options={{
          pageSize: 50,
          pageSizeOptions: [25, 50, 100],
        }}
        onRowClick={(event, rowData) => {
          history.push(`/quests/${rowData.id}`);
        }}
        actions={[
          (rowData) =>
            rowData.status === "draft"
              ? {
                  icon: "publish",
                  tooltip: "Publish Quest",
                  onClick: (event, rowData) => publishQuest(rowData.id),
                }
              : null,
          (rowData) =>
            rowData.status !== "archived"
              ? {
                  icon: "delete",
                  tooltip: "Delete Quest",
                  onClick: (event, rowData) => deleteQuest(rowData.id),
                }
              : null,
        ]}
      />
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={toggleModal}
      >
        <AddIcon />
      </Fab>
      <AddQuestModal open={modalOpened} toggleModal={toggleModal} />
    </div>
  );
}
