import React, { Component, useContext, Fragment, PureComponent } from 'react'
import Multistep from 'react-multistep'
import PropTypes from 'prop-types'
import Img from 'react-image';
import moment from 'moment'
import _ from 'lodash';
import { Row, Form, Input, Label, Card, CardBody, TabContent, TabPane,
  CardHeader, CardFooter, Container, Col, Button, Badge, ButtonGroup,
  Carousel, CarouselItem, CarouselControl, DropdownToggle, DropdownMenu,
  DropdownItem, Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem,
  CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup, FormText,
  InputGroup, InputGroupText, InputGroupAddon, Modal, ModalHeader, ModalBody,
  ModalFooter, Popover, PopoverHeader, PopoverBody, ListGroup, CardImg, CardText,
  CardTitle, Collapse, UncontrolledDropdown, ListGroupItem, ListGroupItemHeading, Table,
  ListGroupItemText, CardImgOverlay, Fade, Media, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';

// import { AccountSectionContext } from '../../../store/context/AccountSectionContext.jsx'


export const AccountSectionSettingsView = function(props) {
  const AccountSettingsChargesAndPaymentsPartial = React.memo((props) => {

    return(
      <ListGroup className="flex-row flex-wrap shadow mt-lg-3 mt-xl-4">
        <ListGroupItem className="w-100 bg-light">
          <ListGroupItemHeading className="text-muted">
            Charges and Payments
            <Button color="link" size="lg" className="pull-right">
              <FontAwesome size="2x" name="plus-circle" />
            </Button>
          </ListGroupItemHeading>
        </ListGroupItem>
        <ListGroupItem className="justify-content-between w-100">
          Cras justo odio <Badge pill>14</Badge>
          <Button type="button" color="link" className="pull-right">
            <FontAwesome name="edit" />
          </Button>
        </ListGroupItem>
        <ListGroupItem className="justify-content-between w-100">
          Dapibus ac facilisis in <Badge pill>2</Badge>
          <Button type="button" color="link" className="pull-right">
            <FontAwesome name="edit" />
          </Button>
        </ListGroupItem>
        <ListGroupItem className="justify-content-between w-100">
          Morbi leo risus <Badge pill>1</Badge>
          <Button type="button" color="link" className="pull-right">
            <FontAwesome name="edit" />
          </Button>
        </ListGroupItem>
      </ListGroup>
    )
  })
  const AccountSettingsLogosAndImagesPartial = React.memo((props) => {

    return(
      <ListGroup className="flex-row flex-wrap shadow mt-lg-3 mt-xl-4">
        <ListGroupItem className="w-100 bg-light">
          <ListGroupItemHeading className="text-muted">
            Logos and Images
            <Button color="link" size="lg" className="pull-right">
              <FontAwesome size="2x" name="plus-circle" />
            </Button>
          </ListGroupItemHeading>
        </ListGroupItem>
        <ListGroupItem className="w-100">
          <strong className="text-capitalize">Company Logo</strong>
          <Button type="button" color="secondary" className="pull-right">View</Button>
        </ListGroupItem>
        <ListGroupItem className="w-100">
          <strong className="text-capitalize">Hotizontal Logo</strong>
          <Button type="button" color="secondary" className="pull-right">View</Button>
        </ListGroupItem>
        <ListGroupItem className="w-100">
          <strong className="text-capitalize">Navigation-Bar Logo</strong>
          <Button type="button" color="secondary" className="pull-right">View</Button>
        </ListGroupItem>
      </ListGroup>
    )
  })
  const AccountSettingsMembersAndEmployeesPartial = React.memo((props) => {

    return (
      <ListGroup className="flex-row flex-wrap shadow mt-lg-3 mt-xl-4"> 0iop
        <ListGroupItem className="w-100 bg-light">
          <ListGroupItemHeading className="text-muted">
            Members and Employees
            <Button color="link" size="lg" className="pull-right">
              <FontAwesome size="2x" name="plus-circle" />
            </Button>
          </ListGroupItemHeading>
        </ListGroupItem>
        <ListGroupItem color="warning" className="w-100">
          <Button color="link" size="lg">
            <FontAwesome name="user" />
          </Button>
        </ListGroupItem>
        <ListGroupItem color="primary" className="w-100">
          <Button color="link" size="lg">
            <FontAwesome name="user" />
          </Button>
        </ListGroupItem>
        <ListGroupItem color="info" className="w-100">
          <Button color="link" size="lg">
            <FontAwesome name="user" />
          </Button>
        </ListGroupItem>
      </ListGroup>
    );
  });


  return (
    <Multistep showNavigation={true} initialStep={1} steps={
      [
        {name: 'StepOne', component: <AccountSettingsChargesAndPaymentsPartial {...props} />},
        {name: 'StepTwo', component: <AccountSettingsLogosAndImagesPartial {...props} />},
        {name: 'StepThree', component: <AccountSettingsMembersAndEmployeesPartial {...props} />},
      ]
    } />
  )
}
