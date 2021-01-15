import $ from "jquery";
import _ from "lodash";
import axios from "axios";
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { createBrowserHistory as history } from 'history'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import { Row, Form, Input, Label, Card, CardBody, CardSubtitle,
  CardHeader, CardFooter, Container, Col, Panel, Button, Badge,
  ButtonGroup, Carousel, CarouselItem, CarouselControl, DropdownToggle,
  DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav,
  NavLink, NavItem, TabContent, TabPane, CarouselsCaption, CarouselIndicators,
  Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon, Modal,
  ModalHeadenamer, ModalBody, ModalFooter, Popover, PopoverHeader, PopoverBody,
  ListGroup, CardImg, CardText, CardTitle, Collapse, UncontrolledDropdown
} from 'reactstrap';

import * as ACTIONS from "../../store/actions/actions";
import { connect } from 'react-redux';


class LoginComponent extends Component {

    state = {
      forceLogin: false,
      activeTab: '1',
      username: '',
      password: ''
    }

    outerColSizeWidths = { xs:{ size: "12" }, sm:{ size: "6", offset: "3" }, lg:{ size: "4", offset: "4"} };
    loginOrRegister = this.loginOrRegister.bind(this);


  UNSAFE_componentDidMount(){
    const { Auth } = this.props
    const $section = $("#login_signup_section")
    // const $submitBtns = $form.find("[type='submit']")
    // const $loginSubmitBtn = $submitBtns.eq(1)
    // const $signupSubmitBtn = $submitBtns.eq(2)
  }

  /* MY METHODS */
  toggleTab(activeTab = this.state.activeTab || "1"){

    this.setState({
      activeTab
    })
  }///END toggle()

  authLogin(username, password){
    this.props.authLogin(username,password)
  }///END fn()

  loginOrRegister(e){
    e.preventDefault()

    let xhrResponse = null,
        $inputValuesArr = {},
        $form = e.currentTarget,
        $formAction = _.trim($($form).data('action'),'/'),
        $inputElmsArr = Object.values($form.querySelectorAll('.form-control'));

    $inputElmsArr.forEach(({ value, name }) => {$inputValuesArr[name] = value});

    switch($formAction.toLowerCase()){
      case 'login':
        xhrResponse = axios.post('/login', {...$inputValuesArr});
        break;
      case 'register':
        xhrResponse = axios.post('/register', {...$inputValuesArr});
        break;
      default:
       xhrResponse = new Promise(null, (res, err) => err('err, with form action ' + $formAction))
       break;
    }//END switch

    //XHR.then(...)
    try{
      xhrResponse.then(({ data }) => {

        const { username, password } = data || false

        ///______REDIRECT TO MEMBER PAGE WITH PARAMS_____\\\
        if(data) this.setState({
          forceLogin: true
        }, () => {
          this.props.authenticateLocally({ data })
          console.log(`____xhr data response: ${JSON.stringify(data)}`)
        })

        // if(data) (<Redirect to={`/member:${decodeURIComponent($.param(data))}`}/>);
      }, (err) => {
        throw new Error("OHH SHIT YO ERROR WITH XHR: ", err)
      })///END .then()
    }catch(err){
      console.log(err)
    }
  }///END fn()

  loginDataChk(e){
    // this fn is called onInput

    let fieldName = e.target.name
    let fieldValue = e.target.value

    this.setState({
      [fieldName]: fieldValue
    }, () => console.log(`loginDataChk() called for data: '${fieldName}: ${fieldValue}'`))
  }///END loginDataChk()

  signupDataChk(e){
    if(!e.target.value || _.isEmpty(e.target.value)) return;

    console.log("signup credentials used: input name: %s, value: '%s'",e.target.nodeName, e.target.value)
  }///END fn()

  ifLoggedOut(){

    return(
      <section id="login_signup_section" >

        <Row>
          <Col className="text-lg-center text-xs-left">
            <h3 className="mt-2 lead text-black-50">
              <i className="fa fa-sign-in" /> Login or Register a New Account <br/>
            </h3>
            <sub className="text-muted">Must fill out fields with (*)</sub>
          </Col><hr/>
        </Row>

        <Row>
          <Col {...this.outerColSizeWidths}>
            <Card body outline>

              <Nav tabs>
                <NavItem active={ this.state.activeTab === '1' }>
                  <NavLink onClick={() => { this.toggleTab('1'); }} >
                    Account Login
                  </NavLink>
                </NavItem>
                <NavItem active={ this.state.activeTab === '2' }>
                  <NavLink onClick={() => { this.toggleTab('2'); }} >
                    New Account
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={this.state.activeTab}>
                {/* LOGIN TAB */}
                <TabPane tabId="1">
                  <Card className="text-dark" body inverse color="light">
                    <CardTitle>Account login</CardTitle>
                    <CardText>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, adipisci?
                    </CardText>
                    <Form onInput={this.loginDataChk.bind(this)} onSubmit={this.loginOrRegister} data-action="/login">

                      <FormGroup>
                        <Label for="last_name">Username</Label>
                        <Input type="text" name="username" id="loginUsername" placeholder="Enter Username" autoComplete="current-username" autoFocus={true} focus="true" />
                      </FormGroup>

                      <FormGroup>
                        <Label for="Password">Password</Label>
                        <Input type="password" name="password" id="loginPassword" placeholder="Enter Password" autoComplete="current-password" />
                      </FormGroup>

                      <Button color="primary" size="lg" type="submit">Login</Button>

                    </Form>
                  </Card>
                </TabPane>

                {/* SIGNUP TAB */}
                <TabPane tabId="2">
                  <Card className="text-dark" body inverse color="light">
                    <CardTitle>Create Account</CardTitle>
                    <CardText>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, adipisci?
                    </CardText>
                    <Form data-action="/register" onInput={this.signupDataChk} onSubmit={this.loginOrRegister}>

                    <FormGroup>
                      <Label for="Email">Email</Label>
                      <Input type="email" name="email" id="signup_email" placeholder="Email" autoComplete="email" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="signupPassword">Password</Label>
                      <Input type="password" name="password" id="signupPassword" placeholder="password placeholder" autoComplete="current-password" />
                    </FormGroup>
                    <Row form>
                      <Col xs="auto" lg="6">
                        <FormGroup>
                          <Label for="first_name">first name</Label>
                          <Input type="text" name="first name" id="first_name" placeholder="First name" required autoComplete="given-name" />
                        </FormGroup>
                      </Col>
                      <Col xs="auto" lg="6">
                        <FormGroup>
                          <Label for="last_name">last name</Label>
                          <Input type="text" name="last name" id="last_name" placeholder="Last name" required autoComplete="family-name" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col lg="5" xs="auto">
                        <FormGroup>
                          <Label for="job_title">job title</Label>
                          <Input type="select" name="select" id="job_title">
                            <option value={null}>Select Job Title</option>
                            <option value="title_1">Title_01</option>
                            <option value="title_2">Title_02</option>
                            <option value="title_3">Title_03</option>
                            <option value="title_4">Title_04</option>
                            <option value="title_5">Title_05</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="7" xs="auto">
                        <FormGroup>
                          <Label for="phone_number">phone number</Label>
                          <Input type="number" length="12" placeholder="1112223333" minLength="10" autoComplete="tel" required autoComplete="tel" />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button color="primary" size="lg" type="submit" >Register</Button>
                    </Form>
                  </Card>
                </TabPane>
              </TabContent>
            </Card>
          </Col>
        </Row>
      </section>
    )
  }

  ifLoggedIn(){
    return(
      <Redirect from={"/login"} to="/dashboard" />
    )
  }


  render() {
    {/* example of form feedback validation inputs
          <Input valid />
          <FormFeedback valid>Sweet! that name is available</FormFeedback>

          <Input invalid />
          <FormFeedback>Oh noes! that name is already taken</FormFeedback>
    */}

    return (this.state.forceLogin) ? this.ifLoggedIn() : this.ifLoggedOut()
  }//END render
}//END class


function mapStateToProps(state) {
  return{
    // isAuthenticated: state.userReducer1.isAuthenticated,
    authenticatedLocally: state.authReducer1.authenticatedLocally
  }
}

function mapDispatchToProps(dispatch) {
  return{
    authenticateLocally: (payload) => dispatch(ACTIONS.authenticate_locally(payload))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent))
