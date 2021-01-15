import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toggle } from 'react-powerplug';
import propTypes from 'prop-types';
import { Row, Form, Input, Label, Card, CardBody, CardColumns, CardSubtitle,
        CardGroup, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup, Carousel, CarouselItem, CarouselControl, DropdownToggle, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem, CardImg, CardText, CardTitle, Collapse, UncontrolledDropdown, ButtonDropdown, ListGroupItemHeading
       } from 'reactstrap';

import { DashboardModuleCardHeader, FontAwesome, Img } from "../../../scripts.jsx";
import 'jqueryui';


const MODULE_NAME = 'patients'

export default class PatientsDashboardModule extends Component {

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
                <i className="fa fa-user" size="lg" />&nbsp;Patient
              </CardTitle>
            </DashboardModuleCardHeader>

            <CardBody className="p-md-1">

              <Img
                className="card-img-top img-thumbnail"
                src={[
                  "./assets/img/awp4_7.jpg",
                  "./assets/img/awp4_0.jpg",
                  "./assets/img/awp4_2.jpg",
                ]}
              />

            </CardBody>

            <ListGroup flush>

            	<Toggle initial={false} render={({ on, toggle }) => (
                  <ListGroupItem color="secondary" >

                    <ButtonDropdown isOpen={on} toggle={toggle}>

                      <DropdownToggle tag="a" caret>
                        <i className="fa fa-home" />
                        &nbsp;Patient Information
                      </DropdownToggle>

                      <DropdownMenu>
                        <DropdownItem header>Another Action</DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                      </DropdownMenu>

                    </ButtonDropdown>

                  </ListGroupItem>
                )
              } />

              <ListGroupItem color="dark pt-1">Patent Info here</ListGroupItem>
              <ListGroupItem color="dark pt-1">Patent Info here</ListGroupItem>
              <ListGroupItem color="dark pt-1">Patent Info here</ListGroupItem>
              <ListGroupItem color="dark pt-1">Patent Info here</ListGroupItem>
              <ListGroupItem color="dark pt-1" className="p-0" title="More">

              	<Button tag="a" color="dark" block>
              		<FontAwesome name="ellipsis-h" size="2x" />
              	</Button>

              </ListGroupItem>
            </ListGroup>

          </Card>
        </CardGroup>
      )} />
    );//END return
  }///END render()
}
