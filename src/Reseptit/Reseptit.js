import React, {useState} from 'react';
// import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Typography } from '@material-ui/core';

import Aamupalat from './Aamupalat/Aamupalat'

const Reseptit = () => {

    // avaa ja sulkee välilehtinäkymän
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0)

    const openHandler = () => {
        console.log('clicked')
        setOpen(!open)
    }

    // välilehtien sisältö
    const TabPanel = (props) => {
        const { children, value, index} = props;
        return (
            <div
           
            hidden={value !== index}
            >
                {value === index && (
                    <div>{children}</div>
                )}
            </div>
        )

    }

    const showTabHandler = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div>
           <Button variant="outlined" onClick={openHandler}>Reseptit <AddBoxIcon fontSize="small"/></Button>
       { open ?
       <div> <AppBar position="static">
            <Tabs value={value} onChange={showTabHandler}>
                <Tab label='Aamupalat'>
                </Tab>
                <Tab label='Lounaat'></Tab>
                <Tab label='Välipalat' ></Tab>
                <Tab label='Päiväruuat'></Tab>
                <Tab label='Iltapalat'></Tab>
            </Tabs>
        </AppBar>
           <TabPanel value={value} index={0}><Aamupalat/></TabPanel>
           <TabPanel value={value} index={1}>Lounaat</TabPanel>
           <TabPanel value={value} index={2}>Välipalat</TabPanel>
           <TabPanel value={value} index={3}>Päiväruuat</TabPanel>
           <TabPanel value={value} index={4}>Iltapalat</TabPanel>
           </div>
       : null}
        </div>
    );
}

export default Reseptit;
