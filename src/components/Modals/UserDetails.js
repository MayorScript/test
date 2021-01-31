import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import avatar from '../../images/avatar.gif'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

 const Delete = (props) => {
    const classes = useStyles();
    return (
        <div className="icon-mod">
            {/* <p className="icon-p">User Details  <br/> delete  <strong>{props.page}?</strong></p>  */}
            
            <Grid container spacing={3}>

        <Grid item xs={4}>
          
          <div className="user_detail ">
              <img src={avatar} alt="image avatar"/>
              <h4>Bessie Alexander</h4>
              <span>@bessieAlexander@gmial.com</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
       
      </Grid>
            {/* {props.modalId} */}
            <div className="d-flex justify-content-center modal__close">
           
                <button className="btn btn-tertiary" onClick={()=>props.setShowModal(!props.showModal)}>
                    X
                </button>
            </div>
        </div>
    )
}
export default Delete;