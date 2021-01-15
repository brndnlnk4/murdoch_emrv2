import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react';
import { Toggle } from 'react-powerplug';
import moment from "moment";
import propTypes from 'prop-types';
import { Row, Form, Alert, Input, Label, Card, CardBody, CardColumns, CardSubtitle,
        CardGroup, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup, Carousel,
        CarouselItem, CarouselControl, DropdownToggle, DropdownMenu, DropdownItem,
        Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, CarouselsCaption,
         CarouselIndicators, Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon,
				Modal, ModalHeader, ModalBody, ModalFooter, Popover, PopoverHeader, PopoverBody,
				 ListGroup, ListGroupItem, CardImg, CardText, CardTitle, Collapse, UncontrolledButtonDropdown, UncontrolledDropdown, ButtonDropdown, ListGroupItemHeading, ListGroupItemText
       } from 'reactstrap';

import { DashboardModuleCardHeader, FontAwesome, Img } from "../../../scripts.jsx";
import 'jqueryui';

const MODULE_NAME = 'prescriptions'
const RxListItem = ({ rxAlert=false, rxBrand='concerta', rxGeneric=false, rxStrength='36mg' }) => {
  const bodyAttr = document.body.attributes;
  const bodyThemeColor = window.bodyAttr = bodyAttr.length ? bodyAttr[0].name : ""
  const date = window.date = moment(new Date() - 360000),
        dateWritten = window.dateWritten = date.format('l'),
        $dateObj = window.$dateObj = date.toObject(dateWritten)

	return(
    <ListGroupItem color={bodyThemeColor==='dark' ? 'dark' : 'light'} className="row d-inline-flex p-2">
      <Img
        src="./assets/img/awp4_2.jpg"
        className="col-md-3 pr-md-1 h-100 img-responsive img-thumbnail"
      />

  	 <ListGroupItemHeading className="col-md-9 col-12">
  		 <UncontrolledButtonDropdown className="row">
  			 <Col md="10" className="p-md-0 text-left">
           <span className="text-capitalize text-small">bob jones</span>
  			 </Col>
  			 <Col md="2">
  				 <DropdownToggle tag="a" color="dark" caret />
  				 <DropdownMenu>
  					 <DropdownItem header>RX INFO</DropdownItem>
  					 <DropdownItem divider></DropdownItem>
  					 <DropdownItem><FontAwesome name="calendar-o" />{ dateWritten }</DropdownItem>
  					 <DropdownItem>Action</DropdownItem>
  					 <DropdownItem>Action</DropdownItem>
  					 <DropdownItem>Action</DropdownItem>
  				 </DropdownMenu>
  			 </Col>
  			 <Col md="12" className="rxInfoContainer pl-md-0 text-capitalize">
           <strong>{ rxBrand || rxGeneric }</strong> <Badge color="dark" pill>{ rxStrength }</Badge>
         </Col>
  		 </UncontrolledButtonDropdown>
  	 </ListGroupItemHeading>


     {( rxAlert ) ? (
       <Alert color="secondary">
         <FontAwesome name="medkit" />&nbsp;{ rxAlert }
       </Alert>
     ) : ('')}

     {( rxStrength ) ? (
         <summary>
           <details>
             <ListGroupItemText className="rxExtraInfoContainer col-md-12 d-inline-flex justify-content-between text-capitalize">
               <dt>Dose:</dt><dd>1/Day</dd>
               <dt>Refills:</dt><dd>3</dd>
             </ListGroupItemText>
           </details>
         </summary>
     ) : ''}

   </ListGroupItem>
	)
}

export default class PrescriptionsDashboardModule extends Component {

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

        <Card inverse={bodyThemeColor==='dark'} className={`${MODULE_NAME}-dashboard-module-card-elm ${on ? "show-more" : ""}`}>

					<DashboardModuleCardHeader id={`${MODULE_NAME}-dashboard-module-card-header`} {...{showMoreOrLessToggler: toggle}}>
						<CardTitle className="pull-left">
							<i className="fa fa-user" />&nbsp;Prescriptions
						</CardTitle>
					</DashboardModuleCardHeader>

         <CardBody>
           <ListGroup flush>

             <RxListItem
               rxBrand='flexeril'
               rxStrength='10mg'
             />
             <RxListItem
               rxBrand='concerta'
               rxStrength='36mg'
               rxAlert='Lorem ipsum dolor sit amet.'
             />
             <RxListItem
               rxBrand='abilify'
               rxStrength='5mg'
             />
             <RxListItem
               rxBrand='prozac'
               rxStrength='5mg'
             />

           </ListGroup>
         </CardBody>

      </Card>
    </CardGroup>
    )} />
  );//END return
}}///END render()
