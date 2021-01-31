import React, { useState, useEffect, useRef } from "react";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function Matrix(props) {
  const tableRef = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const [refetch, setRefetch] = useState(true);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (refetch) {
      fetch(`${process.env.REACT_APP_API_URL}/admin/users-quests`, {
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
            //localStorage.removeItem("MS_loggedIn");
            //history.push("/");
          }
          return res.json();
        })
        .then((res) => {
          const { quests, users } = res;
          const columnsToRender = quests.map((quest, index) => ({
            title: quest.title.toString(),
            field: quest.id.toString(),
          }));
          console.log(columnsToRender);
          setColumns(columnsToRender);
          const dataToRender = users.map((user, key) => {
            let userRow = {
              id: user.id,
              email: user.email,
            };
            user.quests.forEach((element) => {
              console.log(element);
              userRow[element.quest_id] = element.status;
            });
            return userRow;
          });
          console.log(dataToRender);
          setData(dataToRender);
          setRefetch(false);
        })
        .catch((err) => {
          console.error("Error in fetch:", err);
        });
    }
  }, [refetch, history, enqueueSnackbar]);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        tableRef={tableRef}
        columns={[
          {
            title: "Users \\ Quests",
            field: "email",
          },
          ...columns,
        ]}
        data={data}
        title="User-Quest Matrix"
        options={{
          pageSize: 50,
          pageSizeOptions: [25, 50, 100],
        }}
        onRowClick={(event, rowData) => console.log(rowData)}
      />
    </div>
  );
}
