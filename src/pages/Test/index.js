import React, { useState, useEffect, useRef } from "react";
import MaterialTable from "material-table";
import AssignQuestModal from "../../components/AssignQuestModal";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function Users(props) {
  const tableRef = useRef(); 
  const { enqueueSnackbar } = useSnackbar();
  const [refetch, setRefetch] = useState(true);
  const [data, setData] = useState([]);
  const [modalOpened, setModalState] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const history = useHistory();
  const toggleModal = () => {
    setModalState(!modalOpened);
  };

  useEffect(() => {
    if (refetch) {
      fetch(`${process.env.REACT_APP_API_URL}/admin/users`, {
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
  }, [refetch]);

  const setSelectedUsers = (rows) => {
    const list = [];
    rows.forEach((el) => {
      list.push(el.id);
    });
    setUsersList(list);
  };

  const dropSelection = () => {
    tableRef.current.onAllSelected(false);
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        tableRef={tableRef}
        columns={[
          { title: "Name", field: "first_name" },
          { title: "Surname", field: "last_name" },
          { title: "Gender", field: "gender" },
          { title: "Email", field: "email" },
          {
            title: "Connected to MH",
            field: "connected_to_mh",
            type: "boolean",
          },
          {
            title: "Current Score",
            field: "current_score",
            type: "numeric",
          },
          {
            title: "Quests Completed",
            field: "quests_completed",
            type: "numeric",
          },
        ]}
        data={data}
        title="Users"
        options={{
          selection: true,
          pageSize: 50,
          pageSizeOptions: [25, 50, 100],
        }}
        actions={[
          {
            tooltip: "Assign quest to the selected Users",
            icon: "share",
            onClick: (evt, data) => toggleModal(),
            
          },
          

        ]}
        onSelectionChange={(rows) => setSelectedUsers(rows)}
      />
      <AssignQuestModal
        open={modalOpened}
        toggleModal={toggleModal} 
        usersList={usersList}
        dropSelection={dropSelection}
      />
     
    </div>
  );
}
