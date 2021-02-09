import React,{useState} from 'react'
import UserTable from '../../components/Table/UserTable'
import Search from '../../components/Search/UserSearch'
import { fade, makeStyles } from '@material-ui/core/styles';
import Modals from '../../components/Modals'

const useStyles = makeStyles((theme) => ({
  main: {
    padding: '30px'
  },
 

}));
const Users = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [modalPage, setModalPage] = useState("");
  const [modalId, setModalId] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [first_name, setFirstName] = useState("");
  return (
    <>
{/*     
        <Search /> */}
        <UserTable
        page={modalPage} setModalPage={setModalPage} setShowModal={setShowModal} showModal={showModal}
        setModalId={setModalId} modalId={modalId} setFirstName={setFirstName} setUsersList={setUsersList}
        />
        {showModal &&
       <Modals page={modalPage} setModalPage={setModalPage} setShowModal={setShowModal} showModal={showModal} 
       setModalId={setModalId} modalId={modalId} usersList={usersList} first_name={first_name}
       />
      }
   
    </>
  )
}

export default Users;
