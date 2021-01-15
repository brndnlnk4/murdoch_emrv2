import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react';
import $ from "jquery";
import _ from "lodash";
import propTypes from 'prop-types';
import ChartistGraph from 'react-chartist';
import { FaStethoscope, FaMedkit } from "react-icons/fa"
import { Toggle } from 'react-powerplug';
import { Row, Form, Input, Label, Card, CardBody, CardColumns, CardSubtitle,
        CardGroup, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup, Carousel, CarouselItem, CarouselControl, DropdownToggle,
        DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, CarouselsCaption, CarouselIndicators,
        Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Popover, PopoverHeader,
        PopoverBody, ListGroup, CardImg, CardText, CardTitle, Collapse, UncontrolledDropdown, ListGroupItem, Table
      } from 'reactstrap';

import { DashboardModuleCardHeader, Img } from "../../../scripts.jsx";

import 'jqueryui';


const MODULE_NAME = 'medication-stats'


export default class MedicationStatsDashboardModule extends Component {

  constructor(props) {
    super(props);
  }

  componentDidCatch(err){
    console.log("<App /> has error yo: ",err)
  }

  componentDidUpdate(prevProps, prevState) {
    $(() => {
      if($(".medication-chart")){
        $(".medication-chart").find('.ct-line').css({
          "fill": "rgb(255, 0, 230)",
          "stroke": "rgb(152, 0, 82)"
        }).addClass('ct-area')
      }
    })
  }


  /* MY METHODS */

  render() {
    const data = {
      labels: ['l_1', 'l_2', 'l_3', 'l_4', 'l_5', 'l_6', 'l_7', 'l_8', 'l_9'],
      series: [
        [5, 9, 7, -8, 15, -3, -5, 4, 10]
      ]
    }
    const options = {
      low: -20,
      high: 20,
      showArea: true,
    }
    const type = 'Line'
    const style = {
      minHeight: '180px',
      minWidth: '400px'
    };

    return (
      <Toggle initial={false} render={({ on, toggle }) => (

        <CardGroup>

          <Card className={`${MODULE_NAME}-dashboard-module-card-elm`}>

            <DashboardModuleCardHeader id={`${MODULE_NAME}-dashboard-module-card-header`}>
              <CardTitle className="pull-left">
                <FaStethoscope />&nbsp;Medication Stats
              </CardTitle>
            </DashboardModuleCardHeader>

            <section className="mt-lg-2 text-center">
              <h5 className="text-muted">Medication Data</h5>
              <ChartistGraph className="medication-chart" {...{data}} {...{options}} {...{type}} {...{style}} />
            </section>

            <hr/>

            <CardBody>
              <CardTitle>
                <FaMedkit />&nbsp;Medication Info
              </CardTitle>

              <Table striped responsive size="sm" dark={typeof $('body').attr('dark') !== 'undefined'}>
                <thead>
                  <tr>
                    <th>Drug Name</th>
                    <th/>
                    <th>DEA</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Motrin</th>
                    <td><small>100MG</small></td>
                    <td><small>OTC</small></td>
                    <td><small>NSAID</small></td>
                  </tr>
                  <tr>
                    <th scope="row">Norco</th>
                    <td><small>10MG</small></td>
                    <td><small>CII</small></td>
                    <td><small>Narcotic</small></td>
                  </tr>
                  <tr>
                    <th scope="row">Viagra</th>
                    <td><small>10MG</small></td>
                    <th>--</th>
                    <td><small>ED</small></td>
                  </tr>
                </tbody>
              </Table>

            </CardBody>

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
