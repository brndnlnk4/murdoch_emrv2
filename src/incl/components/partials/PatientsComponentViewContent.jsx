import React, { PureComponent, Component, Fragment } from 'react';
import {Render} from 'react-dom';
import { Toggle } from 'react-powerplug';
import PropTypes from 'prop-types';
import Img from 'react-image';
import axios from 'axios'
import _ from 'lodash';
import { Row, Form, Input, Label, Card, CardBody, TabContent, TabPane,
  CardHeader, CardFooter, Container, Col, Button, Badge, ButtonGroup,
  Carousel, CarouselItem, CarouselControl, DropdownToggle, DropdownMenu,
  DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem,
  CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup, FormText,
  InputGroup, InputGroupText, InputGroupAddon, Modal, ModalHeader, ModalBody,
  ModalFooter, Popover, PopoverHeader, PopoverBody, ListGroup, CardImg, CardText,
  CardTitle, Collapse, UncontrolledDropdown, ListGroupItem, ListGroupItemHeading,
  ListGroupItemText, CardImgOverlay, Fade, Media, InputGroupButtonDropdown
} from 'reactstrap';

import DashboardSearchComponent from "../dashboard_modules/DashboardSearchComponent"

import {
  dashboardSortableModuleOptions, dashboardDraggableModuleOptions, reformattedPatientDataForTreeview,
  leftMenuSortableNavItemsOptions, RowWithLeftMenu, MyTreeView, getPatientFileDataInDir, FontAwesom,
  LazyLoadedComponentWrapper,formattedDirText, parseAndDisplayItemByType, PaginatedFooterSection,
  ModalViewContent, AddNewPatientViewContent as AddNewPatientView, FontAwesome
} from '../../../scripts';


export default class PatientsComponentViewContent extends Component {

  state={
    newPatientInputData: new FormData(),
    showAddPatientAllergyModal: false,
    inputFormErrors: []
  }

  submitNewPatientDataHandler = this.submitNewPatientDataHandler.bind(this)
  addAllergyInformationHandler = this.addAllergyInformationHandler.bind(this)
  allergySelection_NestedModal = this.allergySelection_NestedModal.bind(this)
  validateNewPtData = this.validateNewPtData.bind(this)
  addNewError = this.addNewError.bind(this)
  removeError = this.removeError.bind(this)


  componentDidMount() {
    this.props.onload && this.props.onload()
  }


  async submitNewPatientDataHandler(form, data, valid) {
    console.log(`==== \n form: ${form}, \n data: ${data}, \n valide: ${valid}`);

    const newDataValidation = window.newDataValidation = this.validateNewPtData(form);

    if(newDataValidation) alert('ready 4 submit') && await axios.post("/patients/add", data);
  }

  addAllergyInformationHandler() {
    this.setState({
      showAddPatientAllergyModal: !this.state.showAddPatientAllergyModal
    })
  }

  allergySelection_NestedModal() {
    const { showAddPatientAllergyModal: on } = this.state;
    const toggle = this.addAllergyInformationHandler
    const modalTitle = 'Allegy Selection'
    const modalSubTitle = 'Specify allergy details by selecting allergy type below';
    const allergyTypes = ['antibiotic','medication','food','inhalant','insect','other']

    return(
      <ModalViewContent backdrop={false} {...{toggle}} {...{on}} {...{modalTitle}} {...{modalSubTitle}}>
        <Card body>

          <Form>
            <FormGroup>
              <Label for="allergy_types">Allery Type</Label>
              <Input id="allergy_types" type="select" name="allergy_types" required>
                {_.map(allergyTypes, (allergy, key) => (
                  <option key={`allergy_type_${key}`} value={allergy}>{_.capitalize(allergy)}</option>
                ))}
              </Input>
            </FormGroup>

            <Label for="allergy_causes">Known Causes</Label>
            <Input id="allergy_causes" name="allergy_causes" type="select" required>
              <option value="">Not Known</option>
              <option value="">allergy_cause_02</option>
              <option value="">allergy_cause_03</option>
              <option value="">allergy_cause_04</option>
              <option value="">allergy_cause_05</option>
              <option value="">allergy_cause_06</option>
              <option value="">allergy_cause_07</option>
              <option value="">allergy_cause_08</option>
              <option value="">allergy_cause_09</option>
              <option value="">allergy_cause_10</option>
            </Input>

            <Label for="description">Description</Label>
            <Input type="textarea" placeholder="Allergy Description" maxLength="255" />

            <hr/>

            <Col lg={{size: 4, offset: 4}}>
              <ButtonGroup className="">
                <Button title="Submit Allegy Information" size="lg" color="success" type="submit" onClick={(e) => e.preventDefault()}>
                  <FontAwesome name="check" />
                </Button>
                <Button title="Clear Form Input" color="success" type="reset" outline>
                  <FontAwesome name="undo" />
                </Button>
              </ButtonGroup>
            </Col>
          </Form>

        </Card>
      </ModalViewContent>
    )
  }

  validateNewPtData(form) {
    console.log(`\n----valiadateNewPtData() called!!!------`);
    const addNewError = this.addNewError;
    const removeError = this.removeError;

    try {
      $(form.querySelectorAll('.form-control')).each(function(e) {
        if(this.attributes.required) addNewError(this)
        else removeError(this)///end ifelse
      })///END each
    } catch (err) {
      console.log(`\n------- ERROR with newPtDataSubmission: `, err);
    }///END try-catch

    if(Array.from(document.querySelectorAll('.form-control.is-invalid')).length) return false;
    else {
      $(form).find('.form-control').each(function(index, el) {
        _.trim($(el).val()) ? $(el).addClass('is-valid') : $(el).removeClass('is-valid')
      })
    }
  }

  addNewError(inputElm) {
    if(inputElm.classList.contains('invalid-field')) {
      let { inputFormErrors } = this.state;
      let step = _.toNumber($(inputElm).parents('section[data-add-patient-section]').data('addPatientSection')) + 1

      // check 4 duplicate entries in state.errs
      if (_.findKey(inputFormErrors, (err) => (err.name===inputElm.name))) {
        console.log(`duplicate err found in state`);
      } else {
        inputFormErrors.push({ name: inputElm.name, step }) && inputElm.classList.add('is-invalid')
      }

      this.setState({
        inputFormErrors
      })
    }
  }

  removeError(inputElm) {
    inputElm.classList.remove('is-invalid')
    if($(inputElm).next('.invalid-field-warning').length === 1) $(inputElm).next('.invalid-field-warning').remove();
  }

  render() {
    const modalSubTitle = "Fields marked (*) are required",
          modalTitle = (<Fragment><FontAwesome name="user-plus" color="dark" /> Add New Patient</Fragment>),
          submitNewPatientDataHandler = this.submitNewPatientDataHandler,
          addAllergyInformationHandler = this.addAllergyInformationHandler;

    return (
      <Container fluid>

        <Row>
          <Col lg={{ size: 12 }} id="home-main-search-col-wrapper">
            <section id="home-main-search-container" className="pr-lg-5 h-100 shadow">
              <FormGroup>

                <Row>
                  <legend className="font-weight-bold p-md-1 p-lg-1 p-xl-1 col-lg-3">
                    <FontAwesome name="users" />&nbsp;Patients
                  </legend>

                  <Toggle initial={false} render={({ on, toggle }) => (
                    <ButtonGroup className="col-lg-3 offset-lg-6">

                      <Button size="lg" color="link" type="button" onClick={toggle}>
                        <FontAwesome name="user-plus"/>
                      </Button>

                      {/* modal container for adding new patient */}
                      <ModalViewContent
                        {...{on}}
                        {...{toggle}}
                        {...{modalTitle}}
                        {...{modalSubTitle}}
                      >

                        <AddNewPatientView
                          {...{submitNewPatientDataHandler}}
                          {...{addAllergyInformationHandler}}
                        />

                      </ModalViewContent>

                      <Button size="lg" color="link" onClick={() => console.log('removePatient()')}>
                        <FontAwesome name="user-times" />
                      </Button>

                    </ButtonGroup>
                  )} />

                </Row>

                <FormText className="col">
                  <p>Lorem ipsum 0dolor sit amet, consectetur adipisicing elit. Adipisci voluptas, minus expedita suscipit.
                    Pariatur magnam repellendus, temporibus commodi quod ab nulla rem fuga blanditiis nobis.
                    Fuga necessitatibus repudiandae pariatur, qui!
                  </p>
                </FormText>

                <DashboardSearchComponent />

              </FormGroup>
            </section>
          </Col>

          <Col md={{size: 12}} className="pt-lg-5 pt-xl-5 pt-md-5">
            <Card className="shadow">

              <CardHeader>
                <CardTitle>Active and Recent Patients</CardTitle>
                <this.props.patientsComponentHeaderSection {...this.props} />
              </CardHeader>

              <CardBody>
                <this.props.patientsComponentBodySection {...this.props} />
              </CardBody>

            </Card>
          </Col>

          {/* allergy info nested modal */}
          <this.allergySelection_NestedModal />

        </Row>

        {/*
        <Row>
          <Col  lg={{size: 10, offset: 1}} md={{size: 12}}>

            <Card body>

              <CardHeader>
                <CardTitle>search patient</CardTitle>
                <CardText>
                  <span className="text-capitalize">find patients and manage patient records below</span>
                </CardText>
              </CardHeader>

            </Card>
          </Col>
            <hr/>

            <Col lg={{size: 4, offset: 4}}>
              <ButtonGroup className="">
                <Button title="Submit Allegy Information" size="lg" color="success"
        </Row>
        <Row>
          <Col md={{
            size: 8,
            offset: 2
          }}>
        </Col>
      </Row>
      <Row>

        <Col md={{size: 2, offset: 1}}>

          <ButtonGroup id="patientsMainSectionLeftMenu" className="border-left" vertical>
            <Button type="button" size="lg" color="link" block>patient_#1</Button>
            <Button type="button" size="lg" color="link" block>patient_#2</Button>
            <Button type="button" size="lg" color="link" block>patient_#3</Button>
            <Button type="button" size="lg" color="link" block>patient_#4</Button>
            <Button type="button" size="lg" color="link" block>patient_#5</Button>
            <Button type="button" size="lg" color="link" block>patient_#6</Button>
            <Button type="button" size="lg" color="link" block>patient_#7</Button>
          </ButtonGroup>

        </Col>

        <Col md={{size: 9}}>
          <Nav tabs>

            <NavItem>
              <NavLink
                tag="button"
                className="btn btn-link"
                className="btn btn-link"
                active={this.props.ptInfoActiveTab === 1 ? true : false}
                onClick={this.props.screenTabSwitchHandler}
                >
                  patientOption#1
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="button"
                  className="btn btn-link"
                  className="btn btn-link"
                  active={this.props.ptInfoActiveTab === 2 ? true : false}
                  onClick={this.props.screenTabSwitchHandler}
                  >
                    patientOption#2
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="button"
                    className="btn btn-link"
                    className="btn btn-link"
                    active={this.props.ptInfoActiveTab === 3 ? true : false}
                    onClick={this.props.screenTabSwitchHandler}
                  >
                    patientOption#3
                  </NavLink>
                </NavItem>

              </Nav>

              <PatientsInfoTabContent {...this.props} getPatientFileDataInDir={this.getPatientFileDataInDir}/>

            </Col>
          </Row>*/}
        </Container>
    )//END return
  }//END render
}//END class
