import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import LazyLoad from 'react-lazyload-fadein';
import PropTypes from 'prop-types';
import $ from "jquery";
import _ from "lodash";
import {
  Row, Form, Input, Label, Card, CardBody, CardColumns, CardSubtitle, CardDeck, ListGroupItem,
  CardGroup, CardHeader, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup, Carousel,
  CarouselItem, CarouselControl, DropdownToggle, DropdownMenu, DropdownItem, Navbar, NavbarBrand,
  NavbarToggler, Nav, NavLink, NavItem, CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup,
  FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Popover,
  PopoverHeader, PopoverBody, ListGroup, CardImg, CardText, CardTitle, Collapse, UncontrolledDropdown
} from 'reactstrap'
import Grid, { Responsive as ResponsiveGrid, WidthProvider } from "react-grid-layout";

import { DashboardComponentModuleExpandedModal } from '../../scripts.jsx';
import { LeftMenuContext } from '../../store/context/LeftMenuContext';

import 'jqueryui';
import Sortable from 'sortablejs'

import TasksDashboardModule from "./dashboard_modules/TasksDashboardModule";
import InboxDashboardModule from "./dashboard_modules/InboxDashboardModule";
import ClinicDashboardModule from "./dashboard_modules/ClinicDashboardModule";
import CalendarDashboardModule from "./dashboard_modules/CalendarDashboardModule";
import PatientsDashboardModule from "./dashboard_modules/PatientsDashboardModule";
import DashboardSearchComponent from "./dashboard_modules/DashboardSearchComponent";
import FavoritesDashboardModule from "./dashboard_modules/FavoritesDashboardModule";
import PatientStatsDashboardModule from "./dashboard_modules/PatientStatsDashboardModule";
import PrescriptionsDashboardModule from "./dashboard_modules/PrescriptionsDashboardModule";
import MedicationStatsDashboardModule from "./dashboard_modules/MedicationStatsDashboardModule";
import EnrollmentStatsDashboardModule from "./dashboard_modules/EnrollmentStatsDashboardModule";


const ResponsiveGridLayout = WidthProvider(ResponsiveGrid);
const DASHBOARD_MODULE_DRAGGABLE_HANDLE_SELECTOR = ".dashboard-module-draggable-handler";
const LEFTMENU_DROPPABLE_AREA_SELECTOR = ".drop-here-placeholder";


export default class DashboardComponent extends Component {

  state = {
    dateTime: new Date(),
    patientData: {},
    dashboardModuleItems: [
      {id: 1, name: ClinicDashboardModule},
      {id: 2, name: PatientsDashboardModule},
      {id: 3, name: CalendarDashboardModule},
      {id: 4, name: PrescriptionsDashboardModule},
      {id: 5, name: FavoritesDashboardModule},
      {id: 6, name: MedicationStatsDashboardModule},
      {id: 7, name: PatientStatsDashboardModule},
      {id: 8, name: EnrollmentStatsDashboardModule},
      {id: 9, name: InboxDashboardModule},
      {id: 10, name: TasksDashboardModule},
    ]
  }

  onDateChangeHandler = this.onDateChangeHandler.bind(this)

  $defaultGridItemProps = (layoutWidth, moduleId='') => {
    return {
      w: 4,
      h: 1,
      x: 0,
      y: 0,
      minW: 3,
      maxW: (layoutWidth==='xl') ? 8 : 6,
      maxH: 3,
      static: false, ////static=draggable and resizble feature
      onResize: (layout, oldItem, newItem, placeholder, e, element) => {console.log(`\n***onResize():\n layoutConfig: ${layout}`)},
    }
  };
  gridProps = {
    rowHeight: 350,
    margin: [12, 18], /// [x, y]
    isDroppable: false,
    preventCollision: false,
    compactType: "horizontal",
    containerPadding: [15, 20],
    cols: {xl: 12, lg: 12, md: 12},
    droppingItem: { i: 'draggedItemTemp', w: 4, h: 1 },
    draggableHandle: DASHBOARD_MODULE_DRAGGABLE_HANDLE_SELECTOR,
    breakpoints: {xl: 960 + 100, lg: 790 + 100, md: 615 + 100}, //add leftMenu width: +100px
    onDragStop: (layout, oldItem, newItem, placeholder, e, elm) => {
      let { i: id } = window.newItem = newItem

      elm.draggable = true;

      console.log(`
        \n** <DashboardModule />: onDragEnd():
        \n >>>> pushing new 'draggedItemID': '%s' onto state.droppedModules array stack
        \n layout: '%o' oldItem: '%o' newItem: '%o'`, layout, oldItem, newItem
      );
    },
    onLayoutChange: (layout) => {
      // console.log(`\n** <DashboardModule />: on
      // Change():\n layoutConfig: '%o'`, layout)
      // window.layout = layout
    },
    onDragStart: (layout, oldItem, newItem, placeholder, e, elm) => {
      elm.draggable = false;

      console.log(`\n------  <DashboardModule />: onDragStart: elm:  %o, newItem:  %o`, elm,  newItem, `\n\n---- id: `, newItem.i);
    },
    onWidthChange: (containerWidth, margin, cols, containerPadding) => {
      console.log(`\n****  <DashboardModule />: onGridWidthChange:\n containerWidth: %o, margin: %o, cols: %o, contrPadding: %o`,containerWidth, margin, cols, containerPadding)
    },
  };
  layouts = {
    xl: [
      {i: 'ClinicDashboardModule', ...this.$defaultGridItemProps('xl'), x: 0, y: 0, w: 4, h: 2},
      {i: 'CalendarDashboardModule', ...this.$defaultGridItemProps('xl'), x: 1, y: 0, w: 4},
      {i: 'FavoritesDashboardModule', ...this.$defaultGridItemProps('xl'), x: 2, y: 0, w: 4},
      {i: 'MedicationStatsDashboardModule', ...this.$defaultGridItemProps('xl'), x: 0, y: 1, w: 8},
      {i: 'EnrollmentStatsDashboardModule', ...this.$defaultGridItemProps('xl'), x: 0, y: 2, w: 8},
      {i: 'PrescriptionsDashboardModule', ...this.$defaultGridItemProps('xl'), x: 1, y: 2, w: 4},
      {i: 'InboxDashboardModule', ...this.$defaultGridItemProps('xl'), x: 0, y: 3, w: 4},
      {i: 'TasksDashboardModule', ...this.$defaultGridItemProps('xl'), x: 1, y: 3, w: 4},
      {i: 'PatientsDashboardModule', ...this.$defaultGridItemProps('xl'), x: 2, w: 4, y: 3, h: 2},
      {i: 'PatientStatsDashboardModule', ...this.$defaultGridItemProps('xl'), x: 0, y: 4, w: 8},
    ],
    lg: [
      // {i: 'ClinicDashboardModule', ...this.$defaultGridItemProps('lg'), w: 6, x: 0, y: 0, h: 2},
      // {i: 'InboxDashboardModule', ...this.$defaultGridItemProps('lg'), w: 3, x: 1, y: 0},
      // {i: 'TasksDashboardModule', ...this.$defaultGridItemProps('lg'), w: 3, x: 2, y: 0},
      // {i: 'CalendarDashboardModule', ...this.$defaultGridItemProps('lg'), w: 6, x: 0, y: 1},
      // {i: 'EnrollmentStatsDashboardModule', ...this.$defaultGridItemProps('lg'), w: 6, x: 0, y: 2},
      // {i: 'PatientsDashboardModule', ...this.$defaultGridItemProps('lg'), w: 6, x: 1, y: 2, h: 2},
      // {i: 'PatientStatsDashboardModule', ...this.$defaultGridItemProps('lg'), w: 6, x: 0, y: 3},
      // {i: 'MedicationStatsDashboardModule', ...this.$defaultGridItemProps('lg'), w: 6, x: 0, y: 4, h: 2},
      // {i: 'PrescriptionsDashboardModule', ...this.$defaultGridItemProps('lg'), w: 6, x: 1, y: 4},
      // {i: 'FavoritesDashboardModule', ...this.$defaultGridItemProps('lg'), w: 6, x: 0, y: 5},
      {i: 'ClinicDashboardModule', ...this.$defaultGridItemProps('lg'), "w":4,"x":0,"y":0,"h":2},
      {i: 'PatientsDashboardModule', ...this.$defaultGridItemProps('lg'), "w":4,"x":8,"y":3,"h":2},
      {i: 'CalendarDashboardModule', ...this.$defaultGridItemProps('lg'), "w":4,"x":4,"y":0,"h":1},
      {i: 'PrescriptionsDashboardModule', ...this.$defaultGridItemProps('lg'), "w":4,"x":4,"y":3,"h":1},
      {i: 'FavoritesDashboardModule', ...this.$defaultGridItemProps('lg'), "w":4,"x":8,"y":0,"h":1},
      {i: 'MedicationStatsDashboardModule', ...this.$defaultGridItemProps('lg'), "w":8,"x":4,"y":1,"h":1},
      {i: 'PatientStatsDashboardModule', ...this.$defaultGridItemProps('lg'), "w":8,"x":0,"y":4,"h":1},
      {i: 'EnrollmentStatsDashboardModule', ...this.$defaultGridItemProps('lg'), "w":8,"x":4,"y":2,"h":1},
      {i: 'InboxDashboardModule', ...this.$defaultGridItemProps('lg'), "w":4,"x":0,"y":2,"h":1},
      {i: 'TasksDashboardModule', ...this.$defaultGridItemProps('lg'), "w":4,"x":0,"y":3,"h":1},

    ],
    md: [
      {i: 'ClinicDashboardModule', ...this.$defaultGridItemProps('md'), x: 0, y: 0, w: 6},
      {i: 'PatientsDashboardModule', ...this.$defaultGridItemProps('md'), x: 1, y: 0, w: 6},
      {i: 'CalendarDashboardModule', ...this.$defaultGridItemProps('md'), x: 1, y: 1, w: 6},
      {i: 'FavoritesDashboardModule', ...this.$defaultGridItemProps('md'), x: 0, y: 1, w: 6},
      {i: 'EnrollmentStatsDashboardModule', ...this.$defaultGridItemProps('md'), x: 0, y: 1, w: 6},
      {i: 'PrescriptionsDashboardModule', ...this.$defaultGridItemProps('md'), x: 0, y: 2, w: 6},
      {i: 'PatientStatsDashboardModule', ...this.$defaultGridItemProps('md'), x: 0, y: 2, w: 6, h: 2},
      {i: 'InboxDashboardModule', ...this.$defaultGridItemProps('md'), x: 1, y: 2, w: 2, h: 2},
      {i: 'TasksDashboardModule', ...this.$defaultGridItemProps('md'), x: 2, y: 2, w: 6},
      {i: 'MedicationStatsDashboardModule', ...this.$defaultGridItemProps('md'), x: 2, y: 3, w: 6},
    ],
  };

  draggableSortableModulesWrapper = this.draggableSortableModulesWrapper.bind(this)
  onDragToLeftmenuHandler = this.onDragToLeftmenuHandler.bind(this)
  $defaultGridItemProps = this.$defaultGridItemProps.bind(this)


  componentDidMount() {
    $(() => {
      const reactGridItemSections = $("#member_body_modules_container").find("section[draggable]");

      this.props.onload && this.props.onload()

      // new Sortable(reactGridItemSections.parent()[0], {
      //   group: "right-side-items"
      // })

      reactGridItemSections.scroll(function(e) {
        let scrollTopOffset = $(this).scrollTop()
        let resizeHandle = $(this).find('.react-resizable-handle')

        if(scrollTopOffset > 0) resizeHandle.fadeOut('fast', function() {
          // ---TRY SETTING OFFSET SCROLL-HEIGHT AS ELEMENTS POSITIONS BOTTOM CSS PROPERTY...
          console.log(`____scrollTop offset: '${scrollTopOffset}'`);
        }); else resizeHandle.fadeIn('fast');
      });
    })
  }

  componentDidCatch(err) {
    console.log(`\n\n !!!---- error with dashboard component !! \n\n error: `,err);
  }


  /**** MY METHODS ****/
  onDragToLeftmenuHandler({ target: { children: [ cardGroupElm ] } }) {
    const [ dashboardModuleName ] = cardGroupElm.children[0].classList;

    // SET LAST_DRAGGED_ITEM STATE TO 'dashboardModuleName'
    this.props.lastDraggedItemHandler(dashboardModuleName);

    console.log(`draging: %o \n moduleName: '%s'`, cardGroupElm, dashboardModuleName)
  }

  onDateChangeHandler(e) {
    this.setState({
      dateTime: e.sender.value(),
    }, () => console.log(`__date sent: ${e.sender.value}`));
  }

  /* MY METHODS */
  draggableSortableModulesWrapper({ width, ...contextProps }) {
    const { toggleLeftMenu, leftMenuOpen, droppedModules, lastDraggedItemHandler } = contextProps;
    const droppableAreaPlacholderAnim = $(LEFTMENU_DROPPABLE_AREA_SELECTOR);

    let onDragStart = (e) => {
      lastDraggedItemHandler(e)
      droppableAreaPlacholderAnim.removeClass('invisible')
      console.log(`\n======<dashboardModulesComp /> native onDragStart(). e.target: %o`, e.target);
    }

    let onDragEnd = (e) => {
      droppableAreaPlacholderAnim.addClass('invisible')
      console.log(`\n======<dashboardModulesComp /> native onDragEnd(). e.target: %o`, e.target);
    };

    // this.gridProps.lastDraggedItemHandler = lastDraggedItemHandler
    // this.gridProps.droppedModules =   droppedModules

    return (
      <ResponsiveGridLayout layouts={this.layouts} {...this.gridProps} {...{width}}>
        {
          this.state.dashboardModuleItems.map(({ name:Component, id, ...rest }) => (
            <section key={Component.name} {...{onDragEnd}} {...{onDragStart}} draggable={true}>
              <Component { ...{ leftMenuNewModuleDropHandler: { ...this.props } } } />
            </section>
          ))
        }
      </ResponsiveGridLayout>
    )///END return()
  }///END draggableSortableModulesWrapper()


  render() {
    let screenWidth = parseInt(window.innerWidth);
    let width = Number(screenWidth > 740) ? parseInt(screenWidth * 0.90) : screenWidth

    return (
      <Row>
        {
          (this.props.showSearchBar) ? (

            <Col lg={{ size: 12 }} id="home-main-search-col-wrapper">
              <Form id="home-main-search-container" className="pr-lg-5" onSubmit={(e) => e.preventDefault()}>
                <FormGroup>

                  <legend className="font-weight-bold p-md-1 p-lg-1 p-xl-1">
                    <FontAwesome name="columns" />&nbsp;Dashboard
                  </legend>

                  <FormText>
                    <p align="left">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cum esse, earum dignissimos deserunt saepe maxime.
                      Est, mollitia cupiditate sed facilis cumque itaque, quod enim doloribus, quis nostrum ullam iste explicabo,
                      veniam soluta sapiente maxime repudiandae necessitatibus ipsam. Illum molestiae tempore ratione officiis doloremque labore,
                      commodi provident enim, ex dolores ullam est quae voluptas, eveniet ab odit corporis at sequi!
                    </p>
                  </FormText>

                  <DashboardSearchComponent />

                </FormGroup>
              </Form>
            </Col>

          ) : ('')
        }

        <Container id="member_body_modules_container" className="pt-lg-5 pt-xl-5 pt-md-5" onLoad={onload} fluid>

          <LeftMenuContext.Consumer>

            {(contextProps) => (<this.draggableSortableModulesWrapper {...{width}} {...contextProps} />)}

          </LeftMenuContext.Consumer>


        </Container>

        <DashboardComponentModuleExpandedModal {...this.props} />

      </Row>
    )//END return
  }///END render()
}///END class


DashboardComponent.propTypes = {
  showSearchBar: PropTypes.bool.isRequired,
}


{/*<Row>
  <Col md={{size: 6, offset: 3}}>

    <DatePicker
      name="test dateINput"
      title="testing kendo <dateINput />"
      spinners={() => <span>LOADING</span>}
      value={this.state.dateTime}
      min={new Date('2017, 9, 11')}
      max={new Date('2018, 9, 11')}
      change={this.onDateChangeHandler}
      format={"yy/MM/dd"}
    />

  </Col>
</Row>*/}
{/*
  text—The string representation of the item.
  items—The children of the item.
  expanded—If set to true, expands the item.
  selected—If set to true, selects the item.
  disabled—If set to true, disables the item.
  checked—If set to true, checks the item.
  checkIndeterminate—If set to true, applies an indeterminate check to the item.
  hasChildren—If set to true, notifies the TreeView that the item has children even if they are not initially passed. Used for implementing the load-on-demand feature.
*/}
