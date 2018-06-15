import React, {Component} from 'react';
import Login from './components/Login/Login';
import SideNav from './components/SideNav/SideNav';
import MainContent from './components/MainContent/MainContent';
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom';
import {Col} from "reactstrap";
import AssistantHome from './components/assistant/AssistantHome';
import AddDrugs from './components/Drugs/AddDrugs';
import ManageGRN from './components/chief/ManageGRN';
import ChiefHome from './components/chief/ChiefHome';

import './App.css';
import AddDrugBatch from './components/Drugs/AddDrugBatch';

class App extends Component {

  render() {

    /**
     * @description routes is an array of objects which defined each internal route within the app
     * @property path will be the URL
     * @property 'FA_name' the fontAwesome icon name
     * @property 'Title' the link name for the left navigation panel
     * @property component is a function used to make the component shown in the MainContent section
     *  There are 2 arrays; the first one holds the routes and components for the Chief Pharmacist 
     * and the next array holds the routes and components for the assistant   
     */
    let routes;
    routes = this.props.chiefMode ? [
      {
        path: '/app/chiefhome',
        exact: true,
        FA_name:"tachometer-alt",
        title: 'Chief Home',
        component: () => <Col><ChiefHome/></Col>
      },
      {
        path: '/app/send-requests',
        FA_name:"stethoscope",
        title: 'Send Requests (chief)',
        component: () => <Col><h2>CHIEF Send Requests</h2></Col>
      },
      {
        path: '/app/add_drugs',
        FA_name:"capsules",
        title: 'Add Drugs',
        component: () => <Col><AddDrugs/></Col>
      },
      {
        path: '/app/manage_grn',
        FA_name:"capsules",
        title: 'Manage GRN',
        component: () => <Col><ManageGRN/></Col>
      },
      {
        path: '/app/add_drugBatch',
        FA_name:"prescription-bottle-alt",
        title: 'Drug Batch',
        component: () => <Col><AddDrugBatch/></Col>
      },
     
    ] 
    
    : 
    
    [
      {
        path: '/app',
        exact: true,
        FA_name:"tachometer-alt",
        title: 'Home',
        component: () => <Col><AssistantHome/></Col>
      },
      {
        path: '/app/send-requests',
        FA_name:"stethoscope",
        title: 'Send Requests',
        component: () => <Col><h2>Send Requests</h2></Col>
      },
      {
        path: '/app/shoelaces',
        FA_name:"heartbeat",
        title: 'Shoe laces',
        component: () => <Col><h2>Shoelaces</h2></Col>
      },
    ];

    /** this is a wrapper for <Route> which enables 
     * redirecting to login if not authenticated
    */
    const PrivateRoute = ({component: Component, exact, strict, path, ...rest}) => (
      <Route
        exact={exact}
        strict={strict}
        path={path}
        render={props =>
          this.props.authenticated ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {from: props.location} // so that the route remembers where it got to /login from
              }}
            />
          )
        }
      />
    );

    return (
      <Router>
        <div className='appDiv'>
          <Route path='/login'
                 render={
                   routeProps => <Login {...routeProps} authenticated={this.props.authenticated}
                                        toggleLogin={this.props.toggleLogin}/>
                 }
          />

          <PrivateRoute
            path="/"
            exact
            component={SideNav}
            routes={routes}
            chiefMode={this.props.chiefMode}
            toggleChiefMode={this.props.toggleChiefMode}
            toggleLogin={this.props.toggleLogin}
          />

          <PrivateRoute
            path="/app"
            component={SideNav}
            routes={routes}
            toggleChiefMode={this.props.toggleChiefMode}
            toggleLogin={this.props.toggleLogin}
          />

          <PrivateRoute
            path="/app"
            component={MainContent}
            routes={routes}
          />
          
        </div>
      </Router>
    );
  }
}

export default App;
