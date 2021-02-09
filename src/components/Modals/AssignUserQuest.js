import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Submit from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
    // form: {
    //   display: "flex",
    //   flexDirection: "column",
    // },
    input: {
      margin: "10px 0",
    },
  }));

 const AssignUserQuest = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { open, toggleModal, usersList, dropSelection } = props;
    const [selectedQuestId, setSelectedQuest] = useState([]);
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
            props.setShowModal(!props.showModal);
          })
          .catch((err) => {
            enqueueSnackbar(`${err}`, { variant: "error" });
            props.setShowModal(!props.showModal);
          });
      };

      const handleChange = (event) => {
        setSelectedQuest(event.target.value);
        const { options } = event.target;
        const questsList = [];
        // for (let i = 0, l = options.length; i < l; i += 1) {
        //   if (options[i].selected) {
        //     questsList.push(options[i].value);
        //   }
        // }
      };

    return (
        <div className="icon-mod">
         
            
            <Grid container spacing={3}>

        <Grid item xs={12}>
          <h3>   Send quest to {usersList.length} users</h3>
          <div className="u ">
          <form className={classes.form}>
          <div className={classes.input}>
            <InputLabel htmlFor="type">Quest</InputLabel>
            <Select
            
              className="custom_select"
              value={selectedQuestId}
              onChange={handleChange}
              inputProps={{
                name: "quest",
                id: "quest",
              }}
              required
              multiple
            //   input={<Input />}
                renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value={undefined}>None</MenuItem>
              {questsList.map((el, key) => (
                <MenuItem value={el.id} key={key}>
                  {el.title}
                </MenuItem>
              ))}
            </Select>

         
          </div>
          <button className="btn btn-main">Send</button>
        </form>
          </div>
        </Grid>

       
      </Grid>
            {/* {props.modalId} */}
            <div className="d-flex justify-content-center modal__close">
           
                <button className="btn btn-tertiary" onClick={()=>props.setShowModal(!props.showModal)}>
                    X
                </button>
                        {/* <Button
                onClick={handleSubmit}
                color="primary"
                disabled={!selectedQuestId}
                >
                Submit
                </Button> */}
            </div>
        </div>
    )
}
export default AssignUserQuest;