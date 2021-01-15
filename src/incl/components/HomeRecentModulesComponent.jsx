import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Row, Form, Input, Label, Card, CardBody, CardDeck,
        CardHeader, CardFooter, Container, Col, Button, Badge, ButtonGroup, Carousel, CarouselItem, CarouselControl, DropdownToggle, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Popover, PopoverHeader, PopoverBody, ListGroup, CardImg, CardText, CardTitle, Collapse, UncontrolledDropdown
       } from 'reactstrap';

import 'jqueryui';

import TopNavComponent from './TopNavComponent';
import ClinicDashboardModule from './dashboard_modules/ClinicDashboardModule';
import PatientsDashboardModule from './dashboard_modules/PatientsDashboardModule';



export default class HomeRecentModulesComponent extends Component {


  render() {

    return (
        <Row>
          <Col xs="12">

            <hr/>

            <Form>

             <FormGroup>

              <legend>Recently Viewed</legend>

              <FormText>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam corrupti molestias quam soluta suscipit. A mollitia eum velit molestias sapiente, cumque atque veniam, nulla ea sed inventore quaerat dolores recusandae!
              </FormText>
             </FormGroup>

             <FormGroup row>
                <CardDeck id="bottom-dashboard-module-preview">

                  <ClinicDashboardModule />
                  <PatientsDashboardModule />

                </CardDeck>
             </FormGroup>

            </Form>
          </Col>
        </Row>

    );//END return
  }///END render()
}
