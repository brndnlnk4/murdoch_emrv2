import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component, PureComponent } from 'react';
import propTypes from 'prop-types';
import { FaCalendar } from 'react-icons/fa';
import $ from "jquery";
import _ from "lodash";
import { Toggle } from 'react-powerplug';
import { Row, Form, Input, Label, Card, CardBody, CardColumns, CardSubtitle,
        CardGroup, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup, Carousel, CarouselItem, CarouselControl, DropdownToggle,
        DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, CarouselsCaption, CarouselIndicators,
        Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Popover, PopoverHeader,
        PopoverBody, ListGroup, CardImg, CardText, CardTitle, Collapse, UncontrolledDropdown, ListGroupItem
       } from 'reactstrap';

import { DashboardModuleCardHeader, Img, FontAwesome } from "../../../scripts.jsx";
import 'jqueryui';

const MODULE_NAME = 'calendar'


export default class CalendarDashboardModule extends PureComponent {

  moduleContainer = null

  componentDidMount(){
    try{
      const $calendarContainerElm = $( "#calendarOutput" );
      const $dialogContainerElm = $( "#dialog" );

      $calendarContainerElm.datepicker({
        // yearRange: 'c-10:c+10',
        dateFormat: "mm--dd--yy",
        changeMonth: true,
        changeYear: true,
        minDate: "-100y",
        maxDate: "-12y",
        autoSize: true,
        onSelect: this.dateSelectionHandler,
        // inline: true
      })///END datePicker()

      $dialogContainerElm.dialog({
        autoOpen: false,
        width: 400,
        buttons: [
          {
            text: "Ok",
            click: function() {
              $( this ).dialog( "close" );
            }
          },
          {
            text: "Cancel",
            click: function() {
              $( this ).dialog( "close" );
            }
          }///END buttons
        ]//END buttons[]
      })///END dialogue()


      // Link to open the dialog
      $( "#dialog-link" ).click(function( event ) {
        $( this ).dialog( "open" );
        event.preventDefault();
      })//END click

    }catch(err){
      console.log("ERROR WITH $: ",err)
    }

  }///END compDidMount()

  UNSAFE_componentDidCatch(err){
    console.log(`__ error yo! :`, err)
  }

  /* MY METHODS */

  dateSelectionHandler(dateStr, dateInst) {
    console.log(`\n------ selected date: ${dateStr} \n------ date dateOb: %o`, dateInst);
  }

  render() {

    return (
      <Toggle initial={false} render={({ on, toggle }) => (

          <CardGroup>

            <Card className={`${MODULE_NAME}-dashboard-module-card-elm ${on ? "show-more" : ""}`}>

              <DashboardModuleCardHeader id={`${MODULE_NAME}-dashboard-module-card-header`} {...{showMoreOrLessToggler: toggle}}>
                <CardTitle>
                  <FaCalendar />&nbsp;Calendar
                </CardTitle>
              </DashboardModuleCardHeader>

  						<CardBody className="p-md-1">

  							<span id="calendarOutput">
                  {/* JQUERYUI CALENDAR RENDERED HERE */}
                </span>

  							<section id="calendarAppointmentsAccordionContainer">

  								<h6 className="text-left text-capitalize pb-md-1">
  									<strong>my appointments</strong>
  								</h6>

                  <ListGroup color="link" className="m-auto">
                    <ListGroupItem action>Appointments</ListGroupItem>
                    <ListGroupItem>appointment_1</ListGroupItem>
                    <ListGroupItem>appointment_2</ListGroupItem>
                    <ListGroupItem>appointment_3</ListGroupItem>
                  </ListGroup>

  							</section>
  						</CardBody>

  						<CardFooter>
  							<ButtonGroup size="sm" className="w-100 pb-4">

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
        )
      } />
    )//END return
  }///END render()
}
