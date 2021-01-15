import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react';
import { FaUsers, FaStethoscope } from 'react-icons/fa';
import $ from "jquery";
import _ from "lodash";
import Chart from 'chart.js'
import propTypes from 'prop-types';
import ChartistGraph from 'react-chartist';
import { Toggle } from 'react-powerplug';
import { Row, Form, Input, Label, Card, CardBody, CardColumns, CardSubtitle,
        CardGroup, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup, Carousel, CarouselItem, CarouselControl, DropdownToggle,
        DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, CarouselsCaption, CarouselIndicators,
        Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Popover, PopoverHeader,
        PopoverBody, ListGroup, CardImg, CardText, CardTitle, Collapse, UncontrolledDropdown, ListGroupItem
      } from 'reactstrap';

import { DashboardModuleCardHeader, Img } from "../../../scripts.jsx";

import 'jqueryui';


const MODULE_NAME = 'enrollment-stats'
const CHART_HEIGHT = 150
const CHART_WIDTH = 400

export default class EnrollmentStatsDashboardModule extends Component {

  constructor(props) {
    super(props);
  }

  componentDidCatch(err) {
    console.log("<App /> has error yo: ",err)
  }


  componentDidMount() {
    if(!$('#newPtChart')) return;

    const ctx = $('#newPtChart').get(0).getContext('2d');
    const colorsArr = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    const tickLabelFontColor = $('body')[0].attributes.hasOwnProperty('dark') ? '#cfcfcf' : '#333'
    const gradient = mixinColor => {
      let $gradient = ctx.createLinearGradient(0, 180, 0, 0);///createLinGrad(x0, y0, x1, y1)

      $gradient.addColorStop(0, mixinColor)
      $gradient.addColorStop(0.25, colorsArr[_.random(colorsArr.length - 1)])
      $gradient.addColorStop(0.5, colorsArr[_.random(colorsArr.length - 1)])
      $gradient.addColorStop(0.75, colorsArr[_.random(colorsArr.length - 1)])
      $gradient.addColorStop(1, colorsArr[_.random(colorsArr.length - 1)])

      return $gradient
    };


    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: colorsArr,
        datasets: [{
          fill: true,
          borderWidth: 1,
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(36, 255, 64)',// try using linear-gradien(90deg, transparent, green, transparent)
          backgroundColor: gradient('rgba(255, 99, 132, 1)'),
        }]
      },
      options: {
        title: {
          display: false,
          position: 'top',
          text: 'Visits Over Time',
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: tickLabelFontColor,
              fontSize: 12
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: tickLabelFontColor,
              fontSize: 12
            }
          }]
        }//END scales
      }//END options
    });//END chart
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
								<FaStethoscope />&nbsp;Appointments
							</CardTitle>
						</DashboardModuleCardHeader>

            <canvas id="newPtChart" width={CHART_WIDTH} height={CHART_HEIGHT} className="bg-gradient-top-dark"></canvas>

						<CardBody>
							<CardTitle>
								<FaUsers />&nbsp;Information
							</CardTitle>
							<CardText>
								With supporting text below as a natural lead-in to additional content.
							</CardText>
						</CardBody>

        </Card>
      </CardGroup>
    )} />
  );//END return
}}///END render()
