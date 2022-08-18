import React, { useState, useEffect }from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import FastfoodIcon from '@material-ui/icons/Fastfood';

import useStyles from './styles';
import gainzLogo from '../../images/gainzLogo.png';
import gainzText from '../../images/gainzText.png';
import * as actionType from '../../constants/actionTypes'

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        setUser(null);
        history.push('/auth');
    };

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className = {classes.appBar} position="static" color="inherit">
            <Link to="/" className = {classes.brandContainer}>
                <img component={Link} src={gainzText} alt="icon" height="60px"/>
                <img className={classes.image} src={gainzLogo} alt="icon" height="50px" />
            </Link>
            <Typography component={Link} to="/meals" className = {classes.meals} variant="h6">
                <FastfoodIcon/>
                Meals
            </Typography>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className = {classes.userName} variant = "h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component = {Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;