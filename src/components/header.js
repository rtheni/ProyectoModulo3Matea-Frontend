import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';

import '../styles/header.css';

import matelogo from '../img/matea_logo.png';

const Header = () => {
    return (
        <header>
            <AppBar position="static">
                <Toolbar className="App-header">
                    <img src={matelogo} className="App-header-img" alt="matea logo"/>
                    <Box fontSize="35px" fontFamily="Righteous">
                        mateify
                    </Box>
                </Toolbar>
            </AppBar>
        </header>
    );
}

export default Header;