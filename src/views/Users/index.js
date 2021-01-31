import React,{useState} from 'react'
import UserTable from '../../components/Table/UserTable'
import Search from '../../components/Search/UserSearch'
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    padding: '30px'
  },
 

}));
const Users = () => {
  const classes = useStyles();

  return (
    <>
{/*     
        <Search /> */}
        <UserTable/>

   
    </>
  )
}

export default Users;
