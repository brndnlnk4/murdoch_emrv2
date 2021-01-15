import $ from "jquery";
import _ from "lodash";
import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import { Row, Form, Input, Label, Card, CardBody,
        CardHeader, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup, Carousel, CarouselItem, CarouselControl, DropdownToggle, DropdownMenu, ButtonDropdown, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup, FormText, Modal, ModalHeader, ModalBody, ModalFooter, Popover, PopoverHeader, PopoverBody, ListGroup, CardImg, CardText, CardTitle,
        InputGroup, InputGroupAddon, InputGroupText
       } from 'reactstrap';

import 'jqueryui';

const rxNormEndpoints = [
  "queryfdaCode",
  "queryfdaName",
  "queryRxImageCode",
  "queryRxNormName",
  "queryRxNormApproximate",
  "queryRxNormDFG",
  "queryMedlinePage",
  "queryRxNormSpelling",
  "queryRxNormGroup",
];


export default class DashboardSearchComponent extends Component {

  constructor(props){
    super(props)

    this.state = {
      filterBy: "",
      searchValue: null,
      dropdownOpen: false,
      splitButtonOpen: false,
      searchInputDatalist: []
    }

    this.toggleSplit = this.toggleSplit.bind(this)
    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.datalistElement = this.datalistElement.bind(this)
    this.searchMeddicalData = this.searchMeddicalData.bind(this)
  }

  componentDidCatch(err){
    console.log("<App /> has error yo: ",err)
  }

  componentDidMount(){
    $.get("/rx/datalist", ({ dataResponse }) => {
      this.setState({
        searchInputDatalist: _.filter(dataResponse)
      })
    })

    let $sidebarToggleContainer = $('#left-sidebar-toggle-button-container'),
        $sidebarBtnGrpContainer = $('#left-sidebar-button-group-container'),
        $sidebarToggleBtn = $sidebarToggleContainer.children('button'),
        $sidebarContainer = $('#left-sidebar-container');

    if(!$sidebarContainer) return;

    $sidebarToggleBtn.click(() => {

      $sidebarToggleBtn.fadeToggle('fast')
      $sidebarBtnGrpContainer.toggleClass('show')
    })

    window.onscroll = (e) => {
      if(window.scrollY > 225){
        console.log("window offsetTop: %s", e.target.offsetTop)
        //set leftSidebarToggleContainer top:100px;
      }else{
        //set leftSidebarToggleContainer top: 250px; (wraps around jumbotron)
      }///END ifelse
    }///END onScroll
  }///END compDidMount()

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }


  /* MY METHODS */
  onSearchInput($elm) {
    if(_.isEmpty(_.trim($elm.target.value))) return false;

    window.e = $elm;
    
    this.setState({
      searchValue: _.trim($elm.target.value)
    }, () => {
      console.log(`\n ___ search input: '%s'`, this.state.searchValue);
    })//END setState
  }//END onSearchInput()

  datalistElement(props) {
    const { searchValue, searchInputDatalist } = this.state;
    const viewOutput = window.searchInputDatalist = searchInputDatalist.map((value, i) => (
      <Fragment key={i}>
        <option {...{value}} />
      </Fragment>
    ))//END viewOutput

    return (
      <datalist id="home-main-search-input-datalist">
        {viewOutput}
      </datalist>
    )//END return
  }

  searchMeddicalData($target) {
    const qryString = rxNormEndpoints.includes(this.state.filterBy) ? `/rx/${this.state.filterBy}` : ``;

    // generate datalist with retrieved data...
    $.get(qryString, {name: this.state.searchValue}, (response) => {
      let responseData = Array.from(response).map((item, i, arr) => {
        return {...item};
      }).filter(({ name }, ind) => arr.find((el) => el.name === name))

      this.setState({
       searchInputDatalist: !_.isEmpty(response) ? [...response.drugGroup.brand] : []
      }, () => { console.log(`\n>>>>> callback response returned: '%o'`, response) })
    })
  }

  render() {

    const filterByDropdownButtonList = [
      {
        text: _.capitalize('patients'),
        id: 'patients',
        onClick: () => this.setState({filterBy: this.state.filterBy === 'patients' ? '' : 'patients'})
      },
      {
        text: _.capitalize('favorites'),
        id: 'favorites',
        onClick: () => this.setState({filterBy: this.state.filterBy === 'favorites' ? '' : 'favorites'})
      },
      {
        text: _.capitalize('appointments'),
        id: 'appointments',
        onClick: () => this.setState({filterBy: this.state.filterBy === 'appointments' ? '' : 'appointments'})
      },
      {
        text: _.capitalize('Medications'),
        id: 'queryRxNormName',
        onClick: () => this.setState({filterBy: this.state.filterBy === 'queryRxNormName' ? '' : 'queryRxNormName'})
      },
      {
        text: _.capitalize('Contraindications'),
        id: 'queryRxNormGroup',
        onClick: () => this.setState({filterBy: this.state.filterBy === 'queryRxNormGroup' ? '' : 'queryRxNormGroup'})
      },
    ];

    return (
      <InputGroup size="lg">

        <Input
          bsSize="lg"
          type="text"
          id="home-main-search-input"
          list="home-main-search-input-datalist"
          placeholder="Search Medical Information"
          onChange={ this.onSearchInput.bind(this) }
        />

        <this.datalistElement />

        <InputGroupAddon addonType="append">
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>

            <ButtonGroup size="lg">
              <DropdownToggle className={this.state.filterBy ? 'bg-gradient-right-secondary' : ''}>
                <i className={`fa fa-bars`} />
              </DropdownToggle>

              <Button id="home-main-search-btn" type="button" onClick={this.searchMeddicalData}>
                <i className="fa fa-lg fa-search"></i>
              </Button>
            </ButtonGroup>

            <DropdownMenu id="search-dropdown-menu-inner-container">
              <DropdownItem header>Categories</DropdownItem>
              {
                filterByDropdownButtonList.map(({ onClick, text, id }, i ,arr) => (
                  <DropdownItem active={this.state.filterBy === id} key={i} {...{ onClick } }>{text}</DropdownItem>
                ))
              }
            </DropdownMenu>
          </ButtonDropdown>

        </InputGroupAddon>
      </InputGroup>
    )///END return
  }
}
