import React, { Component, useContext, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Row, Form, Input, Label, Card, CardBody,
        CardHeader, CardFooter, Container, Col, Panel, Button, Badge,
         ButtonDropdown, ButtonGroup, Carousel, CarouselItem, CarouselControl,
         DropdownToggle, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler,
         Nav, NavLink, NavItem, CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup,
         FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter,
         Popover, PopoverHeader, PopoverBody, ListGroup, CardImg, CardText, CardTitle, Collapse,
         UncontrolledDropdownm, ListGroupItem
       } from "reactstrap";
import Grid from "react-grid-layout";
import { withRouter } from "react-router-dom";
import { FaHeart, FaGem, FaQuestion, FaLongArrowDown, FaLevelDown } from "react-icons/fa";
import { Toggle } from "react-powerplug";
import Img from "react-image";
import $ from "jquery";
import { ReactSortable } from "react-sortablejs"
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu  } from 'react-pro-sidebar';

import { FontAwesome, ModalViewContent } from "../../scripts.jsx"
import { LeftMenuContext } from "../../store/context/LeftMenuContext.jsx"

import Sortable from "sortablejs"
import "jqueryui";

const GRID_ITEM_DELETION_DROP_CONTAINER_SELECTOR = "#gridItemDropDeletionContainer";
const LEFTMENU_SECTION_CONTAINER_ID = "left-menu-container-section";
const GRID_LAYOUT_CLASSNAME_STRING = "left-menu-grid";
const LEFTMENU_DROPPABLE_AREA_CLASSNAME = "drop-here-placeholder";
const LEFTMENU_GRID_ITEM_CLASSNAME = "left-menu-grid-item";

/**
 * GridViewSubComponent: functional component rendering leftmenu grid layout
 * @param {Function} lastDraggedItemHandler lastDraggedItemHandler    save last draged item to state
 * @param {String} lastDraggedModuleName     last dragged modules name
 * @param {Array} dragAndDroppedModuleNames array of left-menu dropped modules
 */
const GridViewSubComponent = (contextProps, ...rest) => {

  var {
    parseAndTrimModuleName,
    removeGridItemHandler,
    lastDraggedItemHandler,
    lastDraggedModuleName,
    dragAndDroppedModuleNames
  } = contextProps

  let $gridProps = {
    // draggableHandle: ".dashboard-module-draggable-handler",
    // containerPadding: [15, 20],
    width: 100,
    rowHeight: 80,
    margin: [0, 5],
    isDroppable: true,
    isDraggable: false,
    isResizable: false,
    verticalCompact: true,
    compactType: "vertical",
    preventCollision: false,
    layout: [{x: 0, y: 0, w: 12, h: 1, minW: 100, minH: 80, static: true}],
    droppingItem: { className: `${lastDraggedModuleName}-leftmenu-droppable-placeholder`, i: `${lastDraggedModuleName}-leftmenu-droppable-placeholder`, w: 12, h: 1 },
    onDrop: ({ x, y, w, h, e }) => {
      const { target } = e;

      lastDraggedItemHandler(lastDraggedModuleName, true);

      console.log(`\n** <LeftmenuComponent />parseAndTrimModuleName: onDrop():\n item received: '%s' \n__ e.target: %o`, lastDraggedModuleName, target)
    },
    onDragStart: (layout, oldItem, newItem, placeholder, e, elm) => {
      $(() => {
        $(GRID_ITEM_DELETION_DROP_CONTAINER_SELECTOR).addClass('show', function() {
          console.log(`
            \n** <LeftmenuComponent />: onDragStart():
            \n layout: '%o' oldItem: '%o' newItem: '%o', layout, oldItem, newItem
            \n item being dragged: `, elm
          )
        })
      })
    },
    onDragStop: (layout, oldItem, newItem, placeholder, e, elm) => {
      $(() => {
        $(GRID_ITEM_DELETION_DROP_CONTAINER_SELECTOR).removeClass('show', function() {
          console.log(`
            \n** <LeftmenuComponent />: onDragStop():
            \n layout: '%o' oldItem: '%o' newItem: '%o', layout, oldItem, newItem`
          )
        });
      })
    },
    onLayoutChange: (layout) => {
      // USE LEFT MENU CONTEXT TO HANDLE & L{
      console.log(`\n** <LeftmenuComponent />: onLayoutChange():\n layoutConfig: '%o'`, layout)
    }
  }///END $gridProps

  let launchDashboardModuleAsModalHandler = ({ target }, toggle=rest.showModuleInModalViewToggle) => {
    console.log(`\n_____ launchDashboardModuleAsModalHandler target: `, target);

    ModalViewContent({ toggle }, (props) => [(
      <section className="text-center">
        <Col>Module item content here</Col>
      </section>
    )]
  )
}

  let leftMenuGridItemDataResolver = (droppedModuleName) => {

    switch (_.trim(_.camelCase(droppedModuleName))) {
      case "clinicDashboardModule":
      return {
        MODULE_NAME: 'clinic-dashboard-module',
        MODULE_ICON: (rest) => (<FontAwesome name="stethoscope" {... rest} />)
      }
      case "prescriptionsDashboardModule":
      return {
        MODULE_NAME: 'prescriptions-dashboard-module',
        MODULE_ICON: (rest) => (<FontAwesome name="medkit" {... rest} />)
      }
      case "calendarDashboardModule":
      return {
        MODULE_NAME: 'calendar-dashboard-module',
        MODULE_ICON: (rest) => (<FontAwesome name="calendar" {... rest} />)
      }
      case "patientsDashboardModule":
      return {
        MODULE_NAME: 'patients-dashboard-module',
        MODULE_ICON: (rest) => (<FontAwesome name="user-circle" {... rest} />)
      }
      case "favoritesDashboardModule":
      return {
        MODULE_NAME: 'favorites-dashboard-module',
        MODULE_ICON: (rest) => (<FontAwesome name="star" {... rest} />)
      }
      case "medicationStatsDashboardModule":
      return {
        MODULE_NAME: 'medication-stats-dashboard-module',
        MODULE_ICON: (rest) => (<FontAwesome name="history" {... rest} />)
      }
      case "newVisitStatsDashboardModule":
      return {
        MODULE_NAME: 'new-visit-stats-dashboard-module',
        MODULE_ICON: (rest) => (<FontAwesome name="address-book" {... rest} />)
      }
      case "inboxDashboardModule":
      return {
        MODULE_NAME: 'inbox-dashboard-module',
        MODULE_ICON: (rest) => (<FontAwesome name="fas fa-inbox" {... rest} />)
      }
      case "tasksDashboardModule":
      return {
        MODULE_NAME: 'tasks-dashboard-module',
        MODULE_ICON: (rest) => (<FontAwesome name="tasks" {... rest} />)
      }
      default:
      return {
        MODULE_NAME: null,
        MODULE_ICON: () => (<h4>No Icon</h4>)
      }
    }///END switch
  }//END leftMenuGridItemDataResolver

  let leftMenuGridItems = (moduleName, ind) => {
    const trimmedModuleName = parseAndTrimModuleName(moduleName)

    try {

      let { MODULE_NAME, MODULE_ICON } = leftMenuGridItemDataResolver(trimmedModuleName)
      let gridItemContaineClassname = `${trimmedModuleName} ${LEFTMENU_GRID_ITEM_CLASSNAME} border-0 bg-transparent`

      return (
        <ListGroupItem key={ind} title={trimmedModuleName} tag="div" className={`${gridItemContaineClassname} p-0`}>

          {/** REMOVE BUTTON (in top-right corner) **/}
          <Button type="button" color="link" className="col-auto pull-right" onClick={removeGridItemHandler}>
            <FontAwesome name="close" color="black-50" size="sm" />
          </Button>

          {/** MODULE-ITEM BUTTON **/}
          <Button type="button" color="link" className="col-lg-10 left-menu-grid-item-btn" size="lg" onClick={launchDashboardModuleAsModalHandler} block>
            <MODULE_ICON size="2x" />
          </Button>

          <input type="hidden" value={ trimmedModuleName } />

        </ListGroupItem>
      )//END return
    } catch (e) {
      console.log(`\n\n>>>>> ERROR with resolving gridItem: `, e);
    }
  };//END fn

  let noDroppedItemsPlaceholder = () => (
    <NavItem
      key="left-menu-grid-item"
      className={`${LEFTMENU_GRID_ITEM_CLASSNAME} ${LEFTMENU_DROPPABLE_AREA_CLASSNAME} invisible`}
    >
      <span className="fa fa-lg fa-2x fa-arrow-down" />
    </NavItem>
  )


  return (
    <ListGroupItem className="w-100 p-0 border-0" style={{backgroundColor: 'transparent', height: '60%'}}>
      <Grid {...$gridProps} className={`${GRID_LAYOUT_CLASSNAME_STRING} list-group-flush`}>
        {
          dragAndDroppedModuleNames.length ? (
            _.map(dragAndDroppedModuleNames, (name, i) => (leftMenuGridItems(name, i)))
          ) : (
            noDroppedItemsPlaceholder()
          )
        }
      </Grid>
    </ListGroupItem>
  )//END return
}///END GridViewSubComponent


export default class LeftMenuComponentContent extends Component {

  state={
    showModuleInModalView: false,
    showModuleInModalViewToggle: () => this.setState({
      showModuleInModalView: !this.state.showModuleInModalView
    }),
    list: [
      { id: 1, name: "shrek" },
      { id: 2, name: "fiona" },
    ]
  }

  componentDidMount() {

    console.log(`\n\n++++++ leftMenu compDidMount()`);
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log(`\n\n++++++ leftMenu compWillUpdate(). -\n+++old props: %o \n+++new props: %o`, this.props, nextProps);
  }

  render() {
    // ~~~~~~~~ REMEMBER: context data only available to rendered children-components ~~~~~~~~
    return(
      <LeftMenuContext.Consumer>
        {(contextProps) => {

          console.log(`_____leftMenuComp render() method called, contextProps: %o`, contextProps);

          let { leftMenuOpen, droppedModules, moduleOpened, toggleLeftMenu } = contextProps;
          let className = ((props) => {
            let themeColor = window.themeColor = props.themeColor
            let faColorResolved = (themeColor === 'dark') ? (leftMenuOpen ? 'text-primary' : '') : 'text-dark'

            return `fa fa-lg ${leftMenuOpen ? 'fa-chevron-circle-left' : 'fa-bars'} ${faColorResolved}`;
          })(this.props);

          return (
            // LEFTMENU VIEW CONTENT
            <section id={LEFTMENU_SECTION_CONTAINER_ID} className={`sticky-top ${(leftMenuOpen && "menu-open")}`}>

              <Nav id="left-menu-nav-elm" vertical>

                {/*** TOGGLE BUTTON ***/}
                <NavItem>
                  <Button color={leftMenuOpen ? '' : ''} onClick={toggleLeftMenu} title="Toggle Menu" size={leftMenuOpen ? 'lg' : ''}>
                    <i {...{className}} />
                  </Button>
                </NavItem>

                {/*** NESTED MENU > MENU***/}
                <NavItem>
                  <Toggle initial={false} render={({ on:_on, toggle }) => (
                    <ButtonDropdown direction="right" isOpen={_on} toggle={toggle}>
                      <DropdownToggle color="link" caret>
                        <i className="fa fa-4x fa-user" />
                      </DropdownToggle>

                      <DropdownMenu>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  )} />
                </NavItem>

                <NavItem id="left_menu_item_4" className="w-100 left-menu-item" hidden>
                  <NavLink disabled href="#">Disabled</NavLink>
                </NavItem>

                <NavItem id="left_menu_item_1" className="w-100 left-menu-item" hidden>
                  <NavLink href="#">Link</NavLink>
                </NavItem>


                {/*** GRID VIEW RENDERED VIEW ***/}
                <GridViewSubComponent {...contextProps} {...this.state} />
                {/*** GRID VIEW RENDERED VIEW ***/}

              </Nav>
            </section>
            )
          }}
        </LeftMenuContext.Consumer>
      )//END return
  }///END render
}///END LeftMenuComponentContent


{/*
  // REACT-PRO-SIDEBAR EX:
    <ProSidebar toggled={false} collapsed={false}>
      <SidebarHeader>
        </SidebarHeader>
        <SidebarContent>

            <Menu iconShape="square">
              <SubMenu title="Components" icon={<FaGem />}>
              <MenuItem>Component 1</MenuItem>
              <SubMenu title="Sub Component 1" icon={<FaHeart />}>
            </SubMenu>
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        </SidebarFooter>
      </ProSidebar>

  const $DASHBOARD_CONTAINER = $("#member_body_modules_container"),
        $LEFTMENU_CONTAINER = $("#left-menu-container-section"),
				$LEFTMENU_MAIN = $("#left-menu-nav-elm") || $LEFTMENU_CONTAINER.find(".nav"),
        LEFTMENU_SORT_OPTIONS = leftMenuSortableNavItemsOptions,
        $trash_elm = "<span className='fa fa-trash leftmenu-trash-icon'></span>"

	///sortable items
  //		$navItems.serialize( options ) ///returns array_ of items id's
  $LEFTMENU_MAIN.on('sortreceive',LE    layout: [{x: 0, y: 0, w: 12, h: 1, static: false}],
  droppingItem: { className: `${contextProps.lastDraggedModuleName}-leftmenu-droppable-placeholder`, i: `${contextProps.lastDraggedModuleName}-leftmenu-droppable-placeholder`, w: 12, h: 1 },
  onDrop: ({ x, y, w, h, e }) => {
  const { lastDraggedItemHandler, lastDraggedModuleName, dragAndDroppedModuleNames } = contextProps;
  $LEFTMENU_MAIN.on('sortchange',LEFTMENU_SORT_OPTIONS.onChanged.bind(this))
  $LEFTMENU_MAIN.on('sortremove',LEFTMENU_SORT_OPTIONS.onRemove.bind(this))
  $LEFTMENU_MAIN.on('sort',LEFTMENU_SORT_OPTIONS.onSort.bind(this))

  ///sortable left eachjq
	$LEFTMENU_MAIN.sortable({

    ...LEFTMENU_SORT_OPTIONS,

    tolerance: 'intersect',
    classes: {

      "ui-sortable-dragging": "left-menu-sortable"
    //				"ui-sortable-placeholder": "future-elm-accepting-droppable",
    //				"ui-sortable-helper": "cloned-elm-being-sorted-during-sorting",
    //				"ui-draggable-dragging": "bg-secondary",]
    //				"ui-draggable": "bg-primary"
    },
    activate: (event, ui) => {
      console.log("___leftmenu sortable activated___")
    },
    deactivate: (event, ui) => {

      $LEFTMENU_CONTAINER.find('leftmenu-trash-icon').remove()
    },
		start: (event, ui) => {
			console.log("__sorting started__")

      ui.helper.parent(".nav").addClass("bg-danger show-return-trash-icon")

      !$LEFTMENU_CONTAINER.find('.leftmenu-trash-icon') && $($trash_elm).insertAfter($(ui.helper).siblings().last())
		},
		stop: (event, ui) => {
			console.log("__sortable stopped__")

      ui.item.parent("ul.nav").removeClass("bg-danger")
		},
		over: (event, ui) => {
			console.log("__sortable dropped over sortable__")
		},
		receive: (event, ui) => {
			console.log("__sortable dropped into another sortable__")
		},
		change: (event, ui) => {
			console.log("__sortables changed__")
		}
	})//END sortable


	///droppable left menu
  $LEFTMENU_MAIN.droppable({
    tolerance: 'touch', ///fit || intersect || pointer || touch
    accept: "li.droppable:not(.left-menu-item)",
    connectTo: ".droppable",
    connectTo: ".droppable",
    drop: (event, ui) => {
      ////use ui.helper to advantage mr. osuji yamamoto
      const $dragElm = window.$dragElm = ui.draggable,
            $dropTarget = window.$dropTarget = event.target,
            $droppedModule = window.dropedModule = _.first($(_.clone(ui.helper))) ////helper: actual/clone? module being dragged

      ///call fn: leftMenuChange({type: 'add', item: ListItemObj})
      $LEFTMENU_MAIN.removeClass("show-drop-target-placeholder");

      if(this.state.droppedModules.includes($droppedModule)) return;

      $droppedModule && this.setState({
        droppedModules: [ ...this.state.droppedModules, $droppedModule]
      }, () => {
        if(!this.props.leftMenuVisible) this.leftMenuToggleHandler()

        this.props.addDroppedModule($droppedModule);

        $($droppedModule).fadeOut('fast', (e) => {
          console.log(`--- droppedModule faded out, 'e.target': ${$droppedModule}`)
        });
      });

      ///TEST DRAGGABLE DASHBOARD OPTIONS UPDATE TO PARENTS STATE
      let { dashboardDraggableModuleOptions } = this.props

      console.log(`event.type: "${event.type}"`);
    },
    out: (event, ui) => {
      // remove dropHere leftMenu background
      $LEFTMENU_MAIN.removeClass(this.showDropIconClassName)
      console.log("\n ---out event: ", event)
    },
    over: (event, ui) => {
      const { helper } = ui
      // show dropHere background
      $LEFTMENU_MAIN.addClass(this.showDropIconClassName)

      console.log(`\n ---over event triggered`, event);
    }
  })//END droppable
*/}
