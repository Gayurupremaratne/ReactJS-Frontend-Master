import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from 'reactstrap';

import { someAction } from '../actions/';

import {
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
  AppBreadcrumb
} from '@coreui/react';


import Header from './Header';

import navigationAdmin from '../config/navigationAdmin';
import routes from '../config/routes';

class HomeAdmin extends Component {
  componentWillMount() {
    this.props.someAction();
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Header />
        </AppHeader>
        <div className="app-body">

          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigationAdmin} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} /> */}
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...props} />
                  )} />)
                    : (null);
                },
                )}
                <Redirect from="/" to="/admindashboard" />
              </Switch>
            </Container>
          </main>
        </div>
        {/* <AppFooter>
          <Footer />
        </AppFooter> */}
      </div>
    );
  }
}

function mapStateToProps({ somedata }) {
  return {
    somedata
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    someAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeAdmin);
