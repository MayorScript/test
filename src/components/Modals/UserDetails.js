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
              <h6>Bessie {props.first_name}</h6>
              <span>@bessieAlexander@gmial.com</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            <strong>Organization:</strong>
            <span>Money Story</span>
          </div>
        
        </Grid>
        <Grid item xs={4}>
        <div>
            <strong>Total Score:</strong> 1190
          </div>
        </Grid>
        <Grid item xs={12}>
        <div>
            <strong>Categories (5):</strong> 
          </div>
          <div style={{display: 'flex'}}>
         <div style={{marginRight: '30px'}}>
         Help to spend less
         </div>
         <div>
         Help to spend less
         </div>
         <div>
         Help to spend less
         </div>
          </div>
        
        </Grid>
        <Grid item xs={4}>
        <div>
            <strong>Benched Quests:</strong> 1190
          </div>
        </Grid>
        <Grid item xs={4}>
        <div>
            <strong>Benched Quests:</strong> 1190
          </div>
        </Grid>
        <Grid item xs={4}>
        <div>
            <strong>Active Quests:</strong> 1190
          </div>
        </Grid>
        <Grid item xs={4}>
        <button type="button" className="btn btn-cool"><i class="fa fa-power-off pr-2"></i>Activate User</button>
           
        </Grid>
        <Grid item xs={4}>
       
           <button type="button" className="btn btn-dang"><i class="fa fa-ban  pr-2" aria-hidden="true"></i>Ban User</button>
        </Grid>
        <Grid item xs={4}>
        
           <button type="button" className="btn btn-dang"><i class="far fa-trash-alt  pr-2" aria-hidden="true"></i>Delete User</button>
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