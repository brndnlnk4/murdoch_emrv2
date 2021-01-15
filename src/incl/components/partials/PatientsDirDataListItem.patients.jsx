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

// import Patient from '../../../models/Patients'

let $ = require('jquery'),
    _ = require('lodash')
    require('jqueryui')


export default class PatientFileDirStructureListView extends Component {

      componentDidMount(){
        $("#dirMenu").menu()
      }

      getPatientDirDataByDirHandler(clickedItem){
        this.props.getPatientFileDataInDir(clickedItem)
      }


      render(){
        let newList = []
        let { path, dirs, files } = this.props;
        let dirsList = (dirs) => _.values(dirs).length && dirs.map((dir, i) => (

          <ListGroupItem key={i} onClick={() => this.getPatientDirDataByDirHandler(String(dir))}>
            {`${_.trimStart(dir.substr(dir.lastIndexOf('/')), '/')}/`}
          </ListGroupItem>

        ))///END map

        return(
          <Col md="4">
            <ListGroup id="dirMenu">

              <ListGroupItemHeading>
                <ListGroupItem color="info" active>Patient</ListGroupItem>
              </ListGroupItemHeading>

              {dirsList(dirs)}

            </ListGroup>
          </Col>
        )
      }
    }
