import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Details from "./Details";
import Steps from "./Steps";
import Finishes from "./Finishes";
import Reflections from "./Reflections";

function Quest(props) {
  const [quest, setQuest] = useState({});
  const [refetch, setRefetch] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (refetch) {
      fetch(`${process.env.REACT_APP_API_URL}/admin/quests/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
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
          setRefetch(false);
          setQuest(res);
        })
        .catch(err => {
          console.error("Error in fetch:", err);
        });
    }
  }, [id, refetch]);

  const toggleRefetch = () => {
    setRefetch(true);
  };

  return (
    <div>
      <Details quest={quest} toggleRefetch={toggleRefetch} />
      {quest.type === "quiz" ? (
        <Steps quest={quest} toggleRefetch={toggleRefetch} />
      ) : (
        <Reflections quest={quest} toggleRefetch={toggleRefetch} />
      )}
      <Finishes quest={quest} toggleRefetch={toggleRefetch} />
    </div>
  );
}

export default Quest;
