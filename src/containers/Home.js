import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {checkUserLogin} from "../actions/";

import {
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
    AppBreadcrumb
} from "@coreui/react";

import Header from "./Header";

import navigation from "../config/navigations";
import routes from "../config/routes";

class Home extends Component {
    componentWillMount() {
        // this
        //     .props
        //     .someAction();
    }

    checkLogin() {
        const token = localStorage.getItem("access_token");
        if (token) 
            return true;
        else 
            return false;
        }
    
    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <Header/>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader/>
                        <AppSidebarForm/>
                        <AppSidebarNav navConfig={navigation} {...this.props}/>
                        <AppSidebarFooter/>
                        <AppSidebarMinimizer/>
                    </AppSidebar>

                    <main className="main">
                        {/* <AppBreadcrumb appRoutes={routes} /> */}

                        <Switch>
                            {routes.map((route, idx) => {
                                return route.component 
                                    ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => <route.component {...props}/>}/>
                                    )
                                    : null;
                            })}
                            
                                ? (<Redirect from="/" to="/dashboard"/>)
                                : (<Redirect from="/" to="/login"/>)
                        </Switch>
                    </main>
                </div>
            </div>
        );
    }
}

function mapStateToProps({somedata}) {
    return {somedata};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // someAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
