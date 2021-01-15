import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component, PureComponent } from 'react';
import { MdRemove, MdCheckCircle } from 'react-icons/md';
import propTypes from 'prop-types';
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

const MODULE_NAME = 'tasks'


export default class TasksDashboardModule extends PureComponent {

  moduleContainer = null

  componentDidMount() {
    //
  }///END compDidMount()

  UNSAFE_componentDidCatch(err) {
    //
  }

  /* MY METHODS */

  render() {
    const bodyAttr = document.body.attributes;
    const bodyThemeColor = window.bodyAttr = bodyAttr.length ? bodyAttr[0].name : ""

    return (
      <Toggle initial={false} render={({ on, toggle }) => (

          <CardGroup>

            <Card inverse={bodyThemeColor==='dark'} className={`${MODULE_NAME}-dashboard-module-card-elm ${on ? "show-more" : ""}`} inverse>

              <DashboardModuleCardHeader id={`${MODULE_NAME}-dashboard-module-card-header`} {...{showMoreOrLessToggler: toggle}}>
                <CardTitle>
                  {MODULE_NAME}
                </CardTitle>
              </DashboardModuleCardHeader>

  						<CardBody className="p-md-1">
                <pre>{MODULE_NAME} BODY</pre>
                <CardTitle>Lorem ipsum dolor sit.</CardTitle>
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta voluptatibus porro doloremque unde et!
                </CardText>
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta voluptatibus porro doloremque unde et!
                </CardText>
  						</CardBody>

  						<CardFooter>
  							<ButtonGroup size="sm" className="w-100 pb-4">

  								<Button className="w-50" color="info" outline>
                    <MdRemove />
  								</Button>
  								<Button className="w-50" color="info" outline>
                    <MdCheckCircle />
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
