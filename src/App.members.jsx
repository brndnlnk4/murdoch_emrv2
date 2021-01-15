import $ from "jquery";
import _ from "lodash";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { Row, Form, Input, Label, Card, CardBody,
        CardHeader, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup, Carousel, CarouselItem, CarouselControl, DropdownToggle, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Popover, PopoverHeader, PopoverBody, ListGroup, CardImg, CardText, CardTitle, CardSubtitle, Collapse, UncontrolledDropdown
       } from 'reactstrap';

import { dashboardSortableModuleOptions, dashboardDraggableModuleOptions, leftMenuSortableNavItemsOptions } from './scripts';

import MemberFooterComponent from "./incl/components/MemberFooterComponent";
import DashboardComponent from "./incl/components/DashboardComponent";
import PatientsComponent from "./incl/components/PatientsComponent";
import LeftMenuComponent from "./incl/components/LeftMenuComponent";
import WelcomeComponent from "./incl/components/WelcomeComponent";
import TopNavComponent from "./incl/components/TopNavComponent";
//import RxComponent from "./incl/components/RxComponent";


const RxComponent = () => (
  <div class="card card-block">
    <h4 class="card-title">RxComponent title</h4>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
);

const $cookieData = getCookie('auth')


export default class MembersApp extends Component{

  constructor(props){
    super(props)

    this.state = {
      loggedIn: $cookieData,
			leftMenuOpen: true,
      dashboardSortableModuleOptions,
      dashboardDraggableModuleOptions,
      leftMenuSortableNavItemsOptions
    }

		console.log(`_____APP.MEMBERS.js loaded_______`)

    this.userId = null
		this.leftMenuToggle = this.leftMenuToggle.bind(this)
    this.dashboardModuleOptionsHandler = this.dashboardModuleOptionsHandler.bind(this)
	}

  componentDidMount(){
    console.log("App.members comp mounted")
  }


  /* MY METHODS */
  dashboardModuleOptionsHandler(dashboardModuleOptions={}){
    if(_.isEmpty(dashboardModuleOptions)) return;

    this.setState({
      dashboardModuleOptions
    }, () => true) && console.log("\n ____ dashboardModuleOptions() updating to: %o", dashboardModuleOptions)//END setState()
  }///END fn()s

	AuthOnlyRoute({ comp: Component, authChk=true, ...rest}){
		return (
		<Route {...rest} render={(props) => (this.props.loggedIn) ? (
				<Component {...props} {...this.state} dashboardModuleOptionsHandler={this.dashboardModuleOptionsHandler} />
			) : (
				<Redirect
					to={{
							pathname: "/login",
							state: { from: props.location }
						}}
				/>
			)///END ifelse
		} />
	)}//END Autonlyroute

	leftMenuToggle(){
		this.setState({
			leftMenuOpen: !this.state.leftMenuOpen
		})
	}
	leftRightColWidthAdjustController(colIndex=1){
		let { leftMenuOpen: $menu } = this.state;

		return (colIndex === 2) ? (
      //right section main body col
			($menu) ? {xs:"12", md:"11", className:"mt-4"} : {xs:"12", md:"11", className:"mt-4 ml-0"}
		) : (
      //left section menu col
			($menu) ? {md:"1", className:"open pl-0 pr-0"} : {md:"1"}
		)
	}///END fn()


  render(){
    window.pullData = () => this.pullFileDirectoryData('/');
    console.log('\n <App.members/>__ pullfilesData: %o', pullData());

    const $currentPath = this.props.pathname,
					AuthOnlyRoute = this.AuthOnlyRoute.bind(this),
					authCheck = this.state.loggedIn || (async () => await getCookie('auth'))();

    return (!this.props.loggedIn) ? (
      <Redirect to="/logout" />
    ) : (
      <section id="app-container">

        <TopNavComponent {...this.state} />

				<Row id="members-main-wrapper">
					<Col {...this.leftRightColWidthAdjustController(1)} >

						<LeftMenuComponent
						  {...this.state}

						  leftMenuToggle={this.leftMenuToggle}
              dashboardModuleOptionsHandler={this.dashboardModuleOptionsHandler}
      />

					</Col>
					<Col {...this.leftRightColWidthAdjustController(2)}>
						<Switch>

							<AuthOnlyRoute
								path="/"
								authCheck={authCheck}
								comp={DashboardComponent}
       />
							<AuthOnlyRoute
								path="/rx"
								comp={RxComponent}
								authChk={authCheck}
       />
							<AuthOnlyRoute
								path="/patients"
								comp={PatientsComponent}
								authChk={authCheck}
       />
							<AuthOnlyRoute
								path="/dashboard"
								comp={DashboardComponent}
								authChk={authCheck}
       />

						</Switch>
					</Col>
				</Row>

				<MemberFooterComponent />

			</section>
    )//END return()
  }//END render()
}
