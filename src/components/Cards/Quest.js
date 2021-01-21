import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    CallMade,
} from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
    },
    
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        position: 'absolute',
        width: '260px',
        height: '63px',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '16px',
        // "& span":{
        //     width: '31px',
        //     height: '31px',
        //     backgroundColor: '#E8EBF7',
        //   },
      },   

      callMade: { 
          color: '#3F51B5',
          padding: '5px',
          position: 'absolute',
          width: '31px',
          height: '31px',
          backgroundColor: '#E8EBF7'

      }
   
  }));

const QuestCard = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
       
            <Grid item xs={3}>
            <Paper className={classes.paper}>
            Banking Connection
            <span>
            <CallMade className={classes.callMade} />
            </span>
            </Paper>
            </Grid>
     </div>
    )
}

export default QuestCard
