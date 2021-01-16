import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './NavBar.css'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1,
    },
    button: {
        backgroundColor: 'lightblue'
    }
}));

const NavBar = () => {
    
const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar className="toolbar">
            <div>LOGO</div>
        <Typography variant="h6" className={classes.title}>Ellun reseptipankki</Typography>
       
      
        </Toolbar>
        </AppBar>
        </div>

    )
}

export default NavBar;