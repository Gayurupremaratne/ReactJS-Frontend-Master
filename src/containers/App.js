import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import Landing from './views/Landing';
import Invoice from './views/Invoice';
import Category from './views/Category';
import Login from '../containers/Login';
import Dashboard from '../containers/views/Dashboard';
import Contact from '../containers/views/Contactus';
import Home from './Home';
class App extends Component {
    render() {
   

        return (
            <div>

                <ReduxToastr/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/landing" name="landing" render={props => <Landing/>}/>    
                        <Route exact path="/invoice" name="invoice" render={props => <Invoice/>}/>
                        <Route exact path="/login" name="login" render={props => <Login/>}/>
                        <Route exact path="/category" name="category" render={props => <Category/>}/>
                        <Route exact path="/contactus" name="contactus" render={props => <Contact/>}/>
                        <Route path="/" name="Home" component={Home}/>

                    </Switch>

                </BrowserRouter>

            </div>

        );
    }
}

function mapStateToProps({user}) {

    return {user};
}

export default connect(mapStateToProps, null)(App);
