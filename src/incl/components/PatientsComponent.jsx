import React, { Component, Fragment } from 'react';
import {Render} from 'react-dom';
import PropTypes from 'prop-types';
import { Toggle } from 'react-powerplug';
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
  ListGroupItemText, CardImgOverlay, Fade, Media, InputGroupButtonDropdown, Table
} from 'reactstrap';

import {
  dashboardSortableModuleOptions, dashboardDraggableModuleOptions, reformattedPatientDataForTreeview,
  leftMenuSortableNavItemsOptions, RowWithLeftMenu, MyTreeView, getPatientFileDataInDir, FontAwesom,
  LazyLoadedComponentWrapper,formattedDirText, parseAndDisplayItemByType, PaginatedFooterSection,
  ModalViewContent
} from '../../scripts';
import 'jqueryui';

import PatientsComponentViewContent from "./partials/PatientsComponentViewContent"
import PatientsComponentBodySection from "./partials/PatientsComponentBodyPartial.jsx"
import PatientsInfoTabContent from "./partials/PatientsInfoTabContent.patients"
import { LeftMenuContext } from "../../store/context/LeftMenuContext"
import LeftMenuComponent from "./LeftMenuComponent"



export default class PatientsComponent extends Component {

  state = {
    totalRows: 0,
    patientsData: [],
    screenActiveTab: 0,
    selectedTreeviewData: {},
    patientInfoViewPaginationPage: 1
  }

  goToPaginatedPage = this.goToPaginatedPage.bind(this)
  patientsComponentBodySection = PatientsComponentBodySection.bind(this)
  pullPatientData = this.pullPatientData.bind(this)
  changePatientInfoViewScreenHandler = this.changePatientInfoViewScreenHandler.bind(this)
  patientsComponentLazyLoaded = this.patientsComponentLazyLoaded.bind(this)


  componentDidMount() {
    this.pullPatientData()
    this.props.onload && this.props.onload(); ///initialize lazy load
  };///END componentDidMount


  async addNewPatient({ first_name=null, last_name=null, birthday=null, address=null }, ...rest) {
    console.log(`>--------- addNewPatient() rest arg: ${JSON.stringify(rest)}`);

    // for (let i = 4; i > 0; --i) {
    //   if(!first_name || !last_name || !birthday || !address) i++
    //
    //   if(i > 0) alert(`______ need more fields filled out to create new patient_____`);
    //   break;
    // }
  }

  async onItemSelected(e){
    let { expanded, items, text } = window.treeViewClickEvent = e.item;
    let trimmedDir = items && formattedDirText(text)
    let dataPromised = items && this.getPatientsTreeviewData(text);
    let clickedIndex = _.last($.trim(e.itemHierarchicalIndex).split('_'));
    // let patientTreeviewDataCopy = _.clone(this.state.getPatientsTreeviewData)
    // let data = dataPromised && Promise.resolve(dataPromised).then(({data}) => data)

    (async () => {

      if(items){
        const selectedData = _.first(patientTreeviewDataCopy)
        dataPromised = window.dataPromised = await dataPromised

        console.log(`---patientTreeviewDataCopy[0].items[clickedIndex]: ${JSON.stringify(patientTreeviewDataCopy[0].items[clickedIndex])}`);

        patientTreeviewDataCopy[0].items[clickedIndex] = _.first(_.values(reformattedPatientDataForTreeview({...dataPromised.data})))

        e.item.selected = !e.item.selected;

        this.forceUpdate()
      };///END if
    })();///END iife


    console.log(`___oinItemClick: clickedIndex: ${clickedIndex}`);
  }//END fn()

  async onItemExpanded(e){
    const { itemHierarchicalIndex, item,  item: { text: dataDirToGet, items, expanded, dirIndex } } = window.expandEvent = await e
    const { selectedTreeviewData } = this.state
    // const trimmedDir = formattedDirText(text)

    item.expanded = !item.expanded
    this.selectedItem = item.expanded ? item : {}

    if(item.expanded) this.selectedItem.parentIndex = itemHierarchicalIndex

    !_.isEmpty(this.selectedItem) && this.setState({selectedTreeviewData: this.selectedItem})

    const selData = _.isEmpty(items) && await this.loadDataForDir(dataDirToGet, itemHierarchicalIndex) ///if items arr is empty then load>fetch data & re-render

    selData[0] ? this.setState({ selectedTreeviewData: selData[0].text ? selData[0] : item }) : this.forceUpdate()
  }

  async pullPatientData(limit=9, offset=0) {
    try {
      let getPatients = await axios.get(`/patients/all?limit=${limit}&offset=${offset}`)
      let { data: { count } } = await axios.get('/patients/count')
      let { data: { rows, fields } } = getPatients

      this.setState({
        patientsData: rows,
        totalRows: count
      }, () => {
        console.log(`\n------ offset: ${offset}, pulled pt data: %o`, rows);
      })


    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(`--------error received from server response: `, err.response.data);
        // console.log(`--------error received from server response: `, err.response.headers);
        console.log(`-------- axios AJAX error received from server response.status:`, err.response.status);
      } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(`-------- axios AJAX error with request to server:`, err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(`____>>>>> try/catch PROMISE ERROR: `, err.message);
      }
    }
  }

  async loadDataForDir(dataDirToGet='', hierchyIndexes){
    var stateData, ind, selItemData = await this.getPatientsTreeviewData(dataDirToGet).then(data => reformattedPatientDataForTreeview(data));
    var { items } = stateData = await _.cloneDeep(this.state.getPatientsTreeviewData)
    var hierchyIndArr = hierchyIndexes.split('_')

    selItemData && _.forEach(hierchyIndArr, (parentItemInd, curInd, arr) => {

      switch (arr.length) {
        case 2:
          ind = Number(arr[0])
          if(curInd === 1 && (!stateData[ind].items[Number(parentItemInd)].hasOwnProperty('items'))) stateData[ind].items[Number(parentItemInd)] = {..._.first(selItemData)}
        break;
        case 3:
          ind = [Number(arr[0]), Number(arr[1])]
          if(curInd === 2 && (!stateData[ind[0]].items[ind[1]].items[parentItemInd].hasOwnProperty('items'))) stateData[ind[0]].items[ind[1]].items[parentItemInd] = {..._.firsLt(selItemData)}
        break;
        default:
          ind = arr[curInd]
        break;
      }///END switch
      // console.log(`parentItemInd: %o, curInd: %o`, parentItemInd, curInd)
    })//END 4each

    this.setState({
      getPatientsTreeviewData: stateData
    });

    return !_.isEmpty(selItemData) && selItemData
  }


  patientsComponentHeaderSection(props) {

    return(
      <Form>
        <FormGroup inline>
          <InputGroup>

            <InputGroupAddon addonType='prepend'>
              <InputGroupText><FontAwesome name='medkit' /></InputGroupText>
            </InputGroupAddon>

            <Input type="name" maxLength='40' placeholder='find patients by first name, last name or birthday' />

            <Toggle initial={false} render={({ on: isOpen, toggle }) => (
              <InputGroupButtonDropdown addonType="append" {...{isOpen}} {...{toggle}}>

                <Button type="reset"><FontAwesome name="eraser" /></Button>

                <DropdownToggle split title="Filter Patient Search"/>
                <DropdownMenu>
                  <DropdownItem header>Filter Category:</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem disabled title="All Patients">All</DropdownItem>
                  <DropdownItem title="Male Patients">Male</DropdownItem>
                  <DropdownItem title="Female Patients">Female</DropdownItem>
                  <DropdownItem title="Active Patients">Active</DropdownItem>
                  <DropdownItem title="InActive Patients">InActive</DropdownItem>
                  <DropdownItem title="Favorites Patients">Favorites</DropdownItem>
                </DropdownMenu>

              </InputGroupButtonDropdown>
            )} />

          </InputGroup>
        </FormGroup>
      </Form>
    )
  }

  goToPaginatedPage(page) {
    if(!page) return;
    const limCalc = this.state.totalRows - (this.state.patientInfoViewPaginationPage * 9);
    const limit = window.limit = limCalc >= 0 ? limCalc : 9;
    const offset = window.offset = (page > 1 ? (page - 1) * 9 : 0);

    this.setState({
      patientInfoViewPaginationPage: page
    }, () => {
      this.pullPatientData(limit, offset)
    })

    console.log(`\n ____ goToPage(${page})`);
  }

  getPatientsTreeviewData(dirPathToGet='') {
    try {

      return axios.get('/patients/all')

    } catch (err) {
      console.error(err);
    }
  }

  screenTabSwitchHandler(e) {
    const screenActiveTab = _.isElement(e.target) && Number($(e.target).parents('li').index() + 1);

    this.setState({screenActiveTab})
  }

  changePatientInfoViewScreenHandler(screenNum, ptId) {
    if(!_.isNumber(screenNum) || !_.isNumber(ptId)) return;

    ////get ptData by id.

    this.setState({
      screenActiveTab: screenNum
    });
  }

  reformattedPatientDataForTreeviewHandler(data){
    return reformattedPatientDataForTreeview(data)
  }

  patientsComponentLazyLoaded(componentsOwnProps) {

    return (
      <LazyLoadedComponentWrapper
        {...componentsOwnProps}
        {...this.props}
        {...this.state}
        component={(props) => <PatientsComponentViewContent {...props} />}
      />
    )///END return
  }//END lazyLoaderWrappedDashboardComponent


  render() {
    ////toggle comp ex: <Toggle initial={false} render={({on, toggle}) => ()} />
    ////reformat getPatientsTreeviewData into array for treeViewClickEvent

    return (
      <LeftMenuContext.Consumer>
        {(props) => {
          //
          return(
            <RowWithLeftMenu>

              <LeftMenuComponent
                { ...this.state }
                { ...this.props }
              />

              <this.patientsComponentLazyLoaded
                changePatientInfoViewScreenHandler={this.changePatientInfoViewScreenHandler}
                patientsComponentHeaderSection={this.patientsComponentHeaderSection}
                patientsComponentBodySection={() => <PatientsComponentBodySection {...this.state} />}
                screenTabSwitchHandler={this.screenTabSwitchHandler.bind(this)}
                getPatientsTreeviewData={this.getPatientsTreeviewData}
              />

            </RowWithLeftMenu>
          )
        }}
      </LeftMenuContext.Consumer>
    )///END return
  }///END render()
}///END PatientsComponent class


PatientsComponent.propTypes = {
  leftMenuToggle: PropTypes.func.isRequired
}
