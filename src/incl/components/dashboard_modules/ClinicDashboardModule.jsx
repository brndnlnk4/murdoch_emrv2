import $ from "jquery";
import _ from "lodash";
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import propTypes from 'prop-types';
import { Toggle } from 'react-powerplug';
import { Row, Form, Input, Label, Card, CardBody, CardColumns, CardSubtitle,
        CardGroup, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup, Carousel, CarouselItem, CarouselControl, DropdownToggle,
        DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, CarouselsCaption, CarouselIndicators,
        Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Popover, PopoverHeader,
        PopoverBody, ListGroup, CardImg, CardText, CardTitle, Collapse, UncontrolledDropdown, ListGroupItem
       } from 'reactstrap';

import { DashboardModuleCardHeader, Img } from "../../../scripts.jsx";
import 'jqueryui';


const MODULE_NAME = 'clinic'
const ClinicDetailsAndInfo = ({ bodyThemeColor }) => {
  let color = bodyThemeColor==='dark' ? 'dark' : 'light';

	return(
		<ListGroup>
			<ListGroupItem {...{color}} className="flex-shrink-0 d-inline-flex align-items-top p-1">
				<small className="text-muted pr-1 w-25">Clinic</small>
				<small className="w-75 font-weight-bold">Murdock Family Clinic</small>
			</ListGroupItem>
			<ListGroupItem {...{color}} className="flex-shrink-0 d-inline-flex align-items-top p-1">
				<small className="text-muted pr-1 w-25">Timezone</small>
				<small className="w-75 font-weight-bold">CST 5:00pm</small>
			</ListGroupItem>
			<ListGroupItem {...{color}} className="flex-shrink-0 d-inline-flex align-items-top p-1">
				<small className="text-muted pr-1 w-25">Phone</small>
				<small className="w-75 font-weight-bold">111-222-3333</small>
			</ListGroupItem>
			<ListGroupItem {...{color}} className="flex-shrink-0 d-inline-flex align-items-top p-1">
				<small className="text-muted pr-1 w-25">Address</small>
				<small className="w-75 font-weight-bold">1111 Main, Garland, TX 75000</small>
			</ListGroupItem>
			<ListGroupItem {...{color}} className="flex-shrink-0 d-inline-flex align-items-top p-1">
				<small className="text-muted pr-1 w-25">Email</small>
				<small className="w-75 font-weight-bold"><a href="mailto:murdock@yahoo.com">murdock@yahoo.com</a></small>
			</ListGroupItem>
			<ListGroupItem {...{color}} color="warning" className="flex-shrink-0 d-inline-flex align-items-top p-1">
				<small className="text-muted pr-1 w-25">Visit Fee</small>
				<small className="w-75 font-weight-bold">$55.00</small>
			</ListGroupItem>
		</ListGroup>
  )
}///END ClinicDetailsAndInfo

export default class ClinicDashboardModule extends Component {

  constructor(props) {
    super(props);
		//
  }

  componentDidCatch(err){
    console.log("<App /> has error yo: ",err)
  }


  /* MY METHODS */

  render() {
    const bodyAttr = document.body.attributes;
    const bodyThemeColor = window.bodyAttr = bodyAttr.length ? bodyAttr[0].name : ""

    return (
      <Toggle initial={false} render={({ on, toggle }) => (

        <CardGroup>

					<Card inverse={bodyThemeColor==='dark'} className={`${MODULE_NAME}-dashboard-module-card-elm`}>

						<DashboardModuleCardHeader id={`${MODULE_NAME}-dashboard-module-card-header`}>
							<CardTitle className="pull-left">
								<i className="fa fa-stethoscope" />&nbsp;
								My Clinic
							</CardTitle>
						</DashboardModuleCardHeader>

						<Img
							loader={<i className="p-2 fa fa-3x fa-spinner fa-pulse text-center" />}
							className="card-img-top"
							src={[
								"./assets/img/awp4_6.jpg",
								"./assets/img/awp4_0.jpg",
								"./assets/img/awp4_2.jpg",
							]}
						/>

						<CardBody>
							<CardTitle>
								<i className="fa fa-heartbeat" />&nbsp;Clinic Information
								<Button className="pull-right pt-0" color="link" onClick={() => console.log(`---togle clinic details view----`)}>
									<i className={`fa fa-lg fa-angle-double-${ on ? 'up' : 'down' }`} />
								</Button>
							</CardTitle>
							<CardText>
								With supporting text below as a natural lead-in to additional content.
							</CardText>
						</CardBody>

						<ClinicDetailsAndInfo {...{bodyThemeColor}} />

						<CardFooter>
							<ButtonGroup size="sm" className="w-100">
								<Button className="w-50" color="info" outline>
									<i className="fa fa-lg fa-edit"></i>
								</Button>
								<Button className="w-50" color="info" outline>
									<i className="fa fa-lg fa-check-circle"></i>
								</Button>
							</ButtonGroup>
						</CardFooter>

        </Card>
      </CardGroup>
    )} />
  );//END return
}}///END render()
