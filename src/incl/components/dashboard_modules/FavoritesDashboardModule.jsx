import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react';
import { Toggle } from 'react-powerplug';
import $ from 'jquery';
import moment from "moment";
import propTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
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

const MODULE_NAME = 'favorites'

export default class FavoritesDashboardModule extends Component {


  constructor(props) {
    super(props);
    //
  }

  componentDidMount(){
		$("#favoritesPatientsAccordionContainer").accordion({
			active: 1,
			animate: 100
		})///END $.accordion
  }///END compDidMount()

  componentDidCatch(err){
    console.log(`error with favo module: ${err}`);
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
                <FaUserCircle />&nbsp;Favorites
                </CardTitle>
              </DashboardModuleCardHeader>

              <CardBody className="p-md-1">
                <div id="favoritesPatientsAccordionContainer">
                  <h3>favorite</h3>
                  <div>
                    <Row>
                      <Col md="5">
                        <Img
                          className="card-img-top img-thumbnail"
                          src={[
                            "./assets/img/awp4_7.jpg",
                            "./assets/img/awp4_0.jpg",
                            "./assets/img/awp4_2.jpg"
                          ]}
                          />
                      </Col>
                      <Col>
                        <span className="lead text-capitalize">content panel</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <span className="text-capitalize">Lorem.</span>
                      </Col>
                      <Col md="4">
                        <span className="text-capitalize">Lorem.</span>
                      </Col>
                      <Col md="4">
                        <span className="text-capitalize">Lorem.</span>
                      </Col>
                    </Row>
                  </div>
                  <h3>favorite</h3>
                  <div>
                    <Row>
                      <Col md="5">
                        <Img
                          className="card-img-top img-thumbnail"
                          src={[
                            "./assets/img/awp4_7.jpg",
                            "./assets/img/awp4_0.jpg",
                            "./assets/img/awp4_2.jpg"
                          ]}
                          />
                      </Col>
                      <Col>
                        <span className="lead text-capitalize">content panel</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <span className="text-capitalize">Lorem.</span>
                      </Col>
                      <Col md="4">
                        <span className="text-capitalize">Lorem.</span>
                      </Col>
                      <Col md="4">
                        <span className="text-capitalize">Lorem.</span>
                      </Col>
                    </Row>
                  </div>
                  <h3>favorite</h3>
                  <div>
                    <Row>
                      <Col md="5">
                        <Img
                          className="card-img-top img-thumbnail"
                          src={[
                            "./assets/img/awp4_7.jpg",
                            "./assets/img/awp4_0.jpg",
                            "./assets/img/awp4_2.jpg"
                          ]}
                          />
                      </Col>
                      <Col>
                        <span className="lead text-capitalize">content panel</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <span className="text-capitalize">Lorem.</span>
                      </Col>
                      <Col md="4">
                        <span className="text-capitalize">Lorem.</span>
                      </Col>
                      <Col md="4">
                        <span className="text-capitalize">Lorem.</span>
                      </Col>
                    </Row>
                  </div>
                  <h3>favorite</h3>
                  <div>
                    <Row>
                      <Col md="5">
                        <Img
                          className="card-img-top img-thumbnail"
                          src={[
                            "./assets/img/awp4_7.jpg",
                            "./assets/img/awp4_0.jpg",
                            "./assets/img/awp4_2.jpg"
                          ]}
                          />
                      </Col>
                      <Col>
                        <span className="lead text-capitalize">content panel</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <span className="text-capitalize">Lorem.</span>
                      </Col>
                      <Col md="4">
                        <span className="text-capitalize">Lorem.</span>
                      </Col>
                      <Col md="4">
                        <span className="text-capitalize">Lorem.</span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </CardBody>

              <CardFooter>
                <CardTitle>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, id?
                </CardTitle>
              </CardFooter>

            </Card>
          </CardGroup>
        )
      } />
    )
  }
}///END render()
