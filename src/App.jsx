import $ from "jquery";
import _ from "lodash";
import axios from 'axios';
import Waves from 'node-waves';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Toggle } from 'react-powerplug';
import React, { Component, Fragment, createContext } from 'react';
import { BrowserRouter as Router, withRouter, Redirect, Link, Route, Switch } from 'react-router-dom';
import { Row, Form, Input, Label, Card, CardBody,
  CardHeader, CardFooter, Container, Col, Panel,
  Button, Badge, ButtonGroup, Carousel, CarouselItem,
  CarouselControl, DropdownToggle, DropdownMenu, DropdownItem,
  Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem,
  CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup,
  FormText, InputGroup, InputGroupAddon, Modal, ModalHeader,
  ModalBody, ModalFooter, Popover, PopoverHeader, PopoverBody,
  ListGroup, ListGroupItem, CardImg, CardText, CardTitle, CardSubtitle,
  CardGroup, Collapse, UncontrolledDropdown,
} from 'reactstrap';
// import { useAuth0 } from "./react-auth0-spa";

import LoginComponent from './incl/components/LoginComponent';
import TopNavComponent from './incl/components/TopNavComponent';
import WelcomeComponent from './incl/components/WelcomeComponent';
import PatientsComponent from './incl/components/PatientsComponent';
import AccountRoutesComponent from './incl/components/AccountComponent';
import HomeRecentModulesComponent from './incl/components/HomeRecentModulesComponent';
import DashboardComponentLazyLoaderWrapper from './incl/components/DashboardComponentLazyLoaderWrapper';

import { LeftMenuContextProvider } from "./store/context/LeftMenuContext"
import { UserSlidingDrawerSectionContextProvider } from "./store/context/UserSlidingDrawerContext"

import { dashboardSortableModuleOptions, dashboardDraggableModuleOptions,
  leftMenuSortableNavItemsOptions, RowWithLeftMenu, LazyLoadedComponentWrapper
} from './scripts';
import './globals';



///APP WITHOUT AUTH
export default class App extends Component{

  authCheck = this.authCheck.bind(this)
  // userId = window.userid = this.props.Auth.userProfile || null
  state={
    loaded: false,
    curPath: this.props.pathname || '/',
    loggedIn: (this.props.Auth && this.props.Auth.isAuthenticated()) || getCookie('auth'),
  }


  componentDidMount(){
    const { curPath, loggedIn } = this.state
    const cookieData = getCookie('auth');

    Waves.attach('button.btn', ['waves-button']); //.waves-button|circle|float|block
    Waves.init()

    this.setState({
      loaded: true,
      loggedIn: (loggedIn !== cookieData) ? cookieData : loggedIn
    });
  }

  componentDidCatch(err){
    console.log('<App /> DAMN! compDidCatch err: ',err)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const updateOrNot = (this.props.leftMenuVisible == nextProps.leftMenuVisible)

    return updateOrNot
  }

  /* MY METHODS */
  async authCheck(){
    ///return fn to bind properties to window object
    try{
      const { loggedIn } = await this.state;

      return (loggedIn && decodeURIComponent(loggedIn)) || false

    }catch(err){console.log('_ authdata error: ',err); console.log('_data: ',loggedIn)}
    // return (dataToWindowfy) => {window.data = dataToWindowfy};
  }


  render(){

    const { loggedIn } = this.state || this.props;
    const AppProps = {...this.props, ...{onload}};

    return (!this.state.loaded) ? (

      <Col md="auto" lg={8} offset-lg={2}>
        <Card body>
          <i className="fa fa-lg fa-spinner"></i>
        </Card>
      </Col>

    ) : (
      <LeftMenuContextProvider>

        <section id="app-container" className="border-0 w-100">

          <UserSlidingDrawerSectionContextProvider>
            <TopNavComponent {...this.state} {...this.props} />
          </UserSlidingDrawerSectionContextProvider>

          <Switch>
{/********************** AUTH & MAIN ROUTES ************************/}
{/********************** AUTH & MAIN ROUTES ************************/}

              <Route
                path="/dashboard"
                render={props => (
                  <DashboardComponentLazyLoaderWrapper {...AppProps} {...props} />
                )}
              />

              <Route
                path="/patients"
                render={props => (
                  <PatientsComponent {...AppProps} {...props} />
                )}
              />

              <Route
                path="/account/:accountRoute"
                render={(props) => (
                  <AccountRoutesComponent {...AppProps} {...props} />
                )}
              />

{/********************** LOGIN-LOGOUT ROUTES ************************/}
{/********************** LOGIN-LOGOUT ROUTES ************************/}

                <Route
                  path="/login"
                  component={LoginComponent}
                  authCheck={true}
                />

                <Route
                  exact
                  path="/loggingout"
                  render={() => {
                    window.location.pathname='/logout'
                  }}
                />

{/********************** UNAUTHORIZED-MISC ROUTES ************************/}
{/********************** UNAUTHORIZED-MISC ROUTES ************************/}

                  <Route
                    exact
                    path="/"
                    component={props => (
                      <LazyLoadedComponentWrapper
                        component={WelcomeComponent}
                        {...this.props}
                        {...{onload}}
                        {...{props}}
                      />
                    )}
                  />

                </Switch>

                <Col md="12" hidden>
                  <ListGroup color='text'>
                    <ListGroupItem color='info'>item_1</ListGroupItem>
                    <ListGroupItem color='info'>item_2</ListGroupItem>
                    <ListGroupItem color='info'>item_3</ListGroupItem>
                    <ListGroupItem color='info'>item_4</ListGroupItem>
                  </ListGroup>
                </Col>

              </section>

            </LeftMenuContextProvider>
    )///END ifelse
  }//END render()
}///END class{}

// if(module.hot){
//   module.hot.accept(() => App)
// }

document.querySelector('body').setAttribute('dark','')
