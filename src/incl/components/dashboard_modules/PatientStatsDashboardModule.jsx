import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react';
import $ from "jquery";
import _ from "lodash";
import Chart from 'chart.js'
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


const MODULE_NAME = 'patient-stats'
const CHART_HEIGHT = 150
const CHART_WIDTH = 400

export default class PatientStatsDashboardModule extends Component {

  constructor(props) {
    super(props);
  }

  componentDidCatch(err){
    console.log("<App /> has error yo: ",err)
  }


  componentDidMount() {
    if(!$('#myChart')) return;

    const tickLabelFontColor = $('body')[0].attributes.hasOwnProperty('dark') ? '#cfcfcf' : '#333'
    const colors = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    const ctx = $('#myChart').get(0).getContext('2d');
    const gradient = mixinColor => {
      let $gradient = ctx.createLinearGradient(0, 300, 0, 0);

      $gradient.addColorStop(0, mixinColor)
      $gradient.addColorStop(0.25, colors[_.random(colors.length - 1)])
      $gradient.addColorStop(0.5, colors[_.random(colors.length - 1)])

      return $gradient
    };///END $gradient

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: colors,
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            gradient('rgba(255, 99, 132, 1)'),
            gradient('rgba(54, 162, 235, 1)'),
            gradient('rgba(255, 206, 86, 1)'),
            gradient('rgba(75, 192, 192, 1)'),
            gradient('rgba(153, 102, 255, 1)'),
            gradient('rgba(255, 159, 64, 1)')
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: false,
          position: 'top',
          text: 'Patient General Stats',
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
    })//END chart
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
								<i className="fa fa-stethoscope" />&nbsp;Patients Statistics
							</CardTitle>
						</DashboardModuleCardHeader>

            <canvas id="myChart" width={CHART_WIDTH} height={CHART_HEIGHT}></canvas>

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
              <hr/>
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, cum.
              </CardText>
						</CardBody>

        </Card>
      </CardGroup>
    )} />
  );//END return
}}///END render()
