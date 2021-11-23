/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from '../../Pages/Home';
import Post from '../../Pages/Post';
import Profile from '../../Pages/Profile';
import Footer from '../Footer';
import Navbar from '../../components/Navbar/Navbar';
import Users from '../../Pages/Users';
import ResetPassword from '../../Pages/ResetPassword';


const index = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profil/" exact component={Profile} />
                <Route path="/resetPassword/:id/:token" exact component={ResetPassword} />
                <Route path="/users/" exact component={Users} />
                <Route path="/post" exact component={Post} />
                <Redirect to="/" />
            </Switch>
            <Footer />
        </Router>
    );
};

export default index;
