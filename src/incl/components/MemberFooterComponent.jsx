import $ from "jquery";
import _ from "lodash";
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import propTypes from 'prop-types';
import { Row, Form, Input, Label, Card, CardBody, CardColumns, CardSubtitle,
        CardGroup, CardHeader, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup, Carousel, CarouselItem, CarouselControl, DropdownToggle, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Popover, PopoverHeader, PopoverBody, ListGroup, CardImg, CardText, CardTitle, Collapse, UncontrolledDropdown 
       } from 'reactstrap';

import 'jqueryui';

export default class MembersFooterComponent extends Component {
  
  constructor(props) {
    super(props);
    //
  }

  componentDidCatch(err){
    console.log("<App /> has error yo: ",err)
  }
  
  componentDidMount(){
    //
  }///END compDidMount()
  
  componentDidCatch(){
    //
  }
  
  shouldComponentReceiveProps(next){
    //
  }
  
  /* MY METHODS */
    
  render() {
    
    return (
					<section className="container">
						<Row>
							<Col xs="12" className="p-0">
							
								<hr/>
								<nav>
									<ul className="pagination">
										<li className="page-item">
											<a className="page-link" href="#" aria-label="Previous">
												<span aria-hidden="true">&laquo;</span>
												<span className="sr-only">Previous</span>
											</a>
										</li>
										<li className="page-item"><a className="page-link" href="#">1</a></li>
										<li className="page-item"><a className="page-link" href="#">2</a></li>
										<li className="page-item"><a className="page-link" href="#">3</a></li>
										<li className="page-item"><a className="page-link" href="#">4</a></li>
										<li className="page-item"><a className="page-link" href="#">5</a></li>
										<li className="page-item">
											<a className="page-link" href="#" aria-label="Next">
												<span aria-hidden="true">&raquo;</span>
												<span className="sr-only">Next</span>
											</a>
										</li>
									</ul>
								</nav>
								
							</Col>
						</Row>
					</section>
    );//END return
  }///END render()
}