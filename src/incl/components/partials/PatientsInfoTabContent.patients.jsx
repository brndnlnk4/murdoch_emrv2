import React, { Component } from 'react';
import {Render} from 'react-dom';
import propTypes from 'prop-types';
import { Row, Form, Input, Label, Card, CardBody, TabContent, TabPane,
  CardHeader, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup,
  Carousel, CarouselItem, CarouselControl, DropdownToggle, DropdownMenu,
  DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem,
  CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup, FormText,
  InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter,
  Popover, PopoverHeader, PopoverBody, ListGroup, CardImg, CardText,
  CardTitle, Collapse, UncontrolledDropdown, ListGroupItem, ListGroupItemHeading
} from 'reactstrap';

// import PatientModel from '../../../models/Patients'
import PatientDirDataList from './PatientsDirDataListItem.patients'

let $ = require('jquery'),
    _ = require('lodash')
    require('jqueryui')



export default class PatientsInfoTabContent extends Component {

  componentDidMount() {
    $('#dirMenu').selectmenu()
  }


  render(){
    let { ptInfoActiveTab, patientTreeviewData } = this.props

    return(
      <TabContent activeTab={ptInfoActiveTab || 1}>

        <TabPane tabId={1}>
          <Card>

            <CardHeader>
              <CardTitle>patients files</CardTitle>
            </CardHeader>

            <CardBody>
              <Row>
                <Col md={{size:10, offset:1}} lg={{size:8, offset:2}}>
                  <Form>
                    <FormGroup>

                      <FormText>browse files of associated to patient</FormText>
                      <Label for="searchPtFiles"></Label>

                      <InputGroup>
                        <Input name="searchPtFiles" placeholder="Search Patient Files"></Input>
                        <InputGroupAddon addonType="append">
                          <Button color="primary">
                            <i className="fa fa-search"></i>
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>

                    </FormGroup>
                  </Form>
                </Col>
              </Row>

              {(!_.isEmpty(patientTreeviewData)) ? (
                <section>
                {/*
                  dirPath:  {patientTreeviewData.path} <br/>
                  filesChunks: {patientTreeviewData.files && Math.floor(patientTreeviewData.files.length / 3)} <br/>
                  dirsChunks: {patientTreeviewData.dirs && Math.floor(patientTreeviewData.dirs.length / 3)}<br/>
                  \
                */}
                  <PatientDirDataList {...patientTreeviewData} {...this.props} />

                </section>
              ) : (
                <Row>
                  <Col md="12">
                    <h3>no patient data</h3>
                  </Col>
                </Row>
              )}

            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId={2}>
          <Card id="patientRightCardElm">

            <CardHeader>
              <ListGroup className="flex-row align-items-center justify-content-around" flush>
                <ListGroupItem>
                  <dt>name 1</dt>
                  <dd>test_1</dd>
                </ListGroupItem>
                <ListGroupItem>
                  <dt>name 2</dt>
                  <dd>test_2</dd>
                </ListGroupItem>
                <ListGroupItem>
                  <dt>name 3</dt>
                  <dd>test_3</dd>
                </ListGroupItem>
              </ListGroup>
            </CardHeader>

            <CardBody>
              <CardTitle>patient information header</CardTitle>
              <Row>
                <Col md="3">
                  <img src="./assets/img/2.jpg" alt="patient_pic#1" width="100%"/>
                </Col>
                <Col md="9">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, commodi!
                </Col>
              </Row>
              <section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet perferendis, pariatur porro, illum officiis consequuntur in rem error autem maxime est excepturi neque, explicabo dolores! Saepe sint, voluptatibus neque.</section>
            </CardBody>

          </Card>
        </TabPane>
        <TabPane tabId={3}>
          <Card>
            <CardHeader>
              <CardTitle>patients informatin tab #2</CardTitle>
            </CardHeader>
            <CardBody>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, voluptatum iure veniam, aliquam molestiae odio. Quam, eveniet illum libero enim rerum officia! Dolorem atque ut ipsam accusamus, itaque sit perferendis?</CardBody>
          </Card>
        </TabPane>

      </TabContent>
    )
  }
}
