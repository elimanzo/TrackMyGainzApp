import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => (
    <GoogleOAuthProvider clientId="233544559554-nkdhuhrvi3teeji629gl6o6ceh24sene.apps.googleusercontent.com">
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar />
                <Route>
                    <Route path="/" exact component ={Home} />
                    <Route path="/auth" exact component ={Auth} />
                </Route>
            </Container>
        </BrowserRouter>
    </GoogleOAuthProvider>
);

export default App;