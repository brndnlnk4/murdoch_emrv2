import React, { Component, PureComponent, useContext, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash';
import { Row, Form, Input, Label, Card, CardBody, TabContent, TabPane,
  CardHeader, CardFooter, Container, Col, Button, Badge, ButtonGroup,
  Carousel, CarouselItem, CarouselControl, DropdownToggle, DropdownMenu,
  DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem,
  CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup, FormText,
  InputGroup, InputGroupText, InputGroupAddon, Modal, ModalHeader, ModalBody,
  ModalFooter, Popover, PopoverHeader, PopoverBody, ListGroup, CardImg, CardText,
  CardTitle, Collapse, UncontrolledDropdown, ListGroupItem, ListGroupItemHeading,
  ListGroupItemText, CardImgOverlay, Fade, Media, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import $ from 'jquery'


import {
  AccountSectionSettingsView,
} from './partials/AccountSectionPartialViews.jsx'
import LeftMenuComponent from '../components/LeftMenuComponent';
import { RowWithLeftMenu, LazyLoadedComponentWrapper } from '../../scripts';
import { AccountSectionContextProvider } from '../../store/context/AccountSectionContext.jsx'


const AccountViewSwitchHandler = (props) => {
  let activeAccountSectionRoute = _.trim(props.match.params.accountRoute.toLowerCase())

  $(() => {
    props.onload && props.onload();
    $('#accountSectionCardBody').find('button').addClass('btn btn-light')
  })

  return (
    <Row>
      <Col lg={{size: 12}}>

        <AccountSectionContextProvider>
          <Card className="m-lg-2 m-xl-3 ml-1">

            <CardHeader>
              <CardTitle className="h3">
                <FontAwesome name="columns" size="lg" /> {_.upperFirst(activeAccountSectionRoute)}
              </CardTitle>
              <CardText>{props.match.url}</CardText>
            </CardHeader>

            <CardBody id="accountSectionCardBody">
              {
                activeAccountSectionRoute === 'settings' ? (
                  <AccountSectionSettingsView {...props} />
                ) : ('')
              }
            </CardBody>
          </Card>
        </AccountSectionContextProvider>

      </Col>
    </Row>
  );
}/////END <AccountViewSwitchHandler />


export default class AccountComponent extends Component {
  static propTypes = {
    onload: PropTypes.func,
    match: PropTypes.object.isRequired,
    leftMenuToggle: PropTypes.func.isRequired,
    leftMenuVisible: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    if(this.props.onload) this.props.onload()
  }


  render () {
    const { leftMenuVisible, leftMenuToggle } = this.props;

    return (
      <section id="account-main-container">

        <RowWithLeftMenu
          {...{leftMenuVisible}}
          id="members-main-wrapper"
        >

            <LeftMenuComponent
              { ...this.state }
              { ...this.props }
              leftMenuToggle={leftMenuToggle}
            />

            <LazyLoadedComponentWrapper
              component={AccountViewSwitchHandler}
              {...this.props}
            />

        </RowWithLeftMenu>
      </section>
    )///END return
  }///END render
}///END showDropIconClassName
