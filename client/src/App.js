import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import gainz from './images/gainz.png';
import useStyles from './styles';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className = {classes.appBar} position="static" color="inherit">
                <Typography variant="h2" align="center">Track My Gainz</Typography>
                <img className={classes.image} src={gainz} alt="gainz" height="60" />
            </AppBar>
            <Grow in>
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Grow>
        </Container>
    );
}

export default App;