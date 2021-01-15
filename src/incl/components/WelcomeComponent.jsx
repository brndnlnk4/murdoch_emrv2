import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Toggle } from "react-powerplug";
import { Row, Form, Input, Label, Card, CardBody,
        CardHeader, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup, Carousel, CarouselItem, CarouselControl, DropdownToggle, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Popover, PopoverHeader, PopoverBody, ListGroup, CardImg, CardText, CardTitle, CardSubtitle, Collapse, UncontrolledDropdown
       } from 'reactstrap';

import 'jqueryui';


export default class WelcomeComponent extends Component {

  constructor(props) {
    super(props);

		this.leftMenuToggleHandler = this.leftMenuToggleHandler.bind(this)
  }


  componentDidMount() {
    this.props.onload()
  }

	/* MY METHODS */
	leftMenuToggleHandler(){
		this.props.leftMenuToggle()
	}


  render(){

    return(
    <Row>
      <Jumbotron fluid>
        <Card>

          <CardHeader>
            <CardTitle tag="h3">Murdock EMR | <i className="fa fa-lg fa-stethoscope"/></CardTitle>
            <CardSubtitle>Simplicity Matters</CardSubtitle>
          </CardHeader>

          <CardBody>
            <CardImg src="./assets/img/awp4_2.jpg" width="auto" top />
            <CardTitle>
              <CardText>Simple is Always Betters</CardText>
            </CardTitle>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis odio vitae mollitia maxime exercitationem consequatur cumque amet facere ipsum quibusdam obcaecati repellendus vel quis eum, a quo adipisci laudantium eius delectus sapiente dolorem! Ad et ut impedit pariatur, fuga! Temporibus, cupiditate? Ipsam ipsum unde dignissimos omnis possimus, magni ea necessitatibus!
            </CardText>
          </CardBody>

        </Card>
      </Jumbotron>
      <hr/>
    </Row>
    )//END WelcomeComponent
  }///END render()
}
