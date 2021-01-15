import { Link, NavLink, Redirect } from "react-router-dom";
import React, { Component, PureComponent, useContext } from 'react';
import { Toggle } from "react-powerplug";
import propTypes from 'prop-types';
import _ from 'lodash';
import { Row, Form, Input, Label, Card, CardBody,ListGroupItem, ListGroupItemHeading,
        ListGroupItemText, CardHeader, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup,
        Carousel, CarouselItem, CarouselControl, DropdownToggle, DropdownMenu, DropdownItem,
        Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, CarouselsCaption, CarouselIndicators,
        Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody,
        ModalFooter, Popover, PopoverHeader, PopoverBody, ListGroup, CardImg, CardText, CardTitle,
        Collapse, UncontrolledCollapse, UncontrolledDropdown, Dropdown
      } from 'reactstrap';

// import { connect } from 'react-redux';

import { renderDeepMenuItems, GuestNavContent, AuthNavContent, NavbarComponent, getCookie } from '../../scripts';
import { AccountSectionContext } from '../../store/context/AccountSectionContext';
import { UserSlidingDrawerContext } from '../../store/context/UserSlidingDrawerContext'

import AuthCheck from '../../containers/AuthChk';
import Container1 from '../../containers/container1';
import UserSlidingDrawerViewComponent from './partials/UserSlidingDrawerViewComponent';


const goToAccountSectionHandler = (section) => {
  let { goToAccountSection } = useContext(AccountSectionContext)

  if(!section) return;

  goToAccountSection(section)
};


export class TopNavComponent extends Component {

  constructor(props) {
    super(props);

    this.state={
      pathName: typeof this.props.pathname !== 'undefined' && this.props.pathname,
      authCheck: this.props.loggedIn || !_.isEmpty(getCookie('auth')),
      forceLogout: false
    };

    console.log(`_-->>>>>>>>> loggedIn prop: `, this.props.loggedIn);
  }

  componentDidMount() {
    this.setState({
      authCheck: this.props.loggedIn
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("\n___curProps: %o, \n___prevProps: %o",this.props, prevProps);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const $currentAuthChk = this.props.loggedIn;
    const $nextAuthChk = nextProps.loggedIn;

    if($currentAuthChk !== $nextAuthChk) this.setState({authCheck: $currentAuthChk});
  }

  async checkLogin(){
    let authCheck = await this.props.loggedIn;

    this.setState({
      authCheck,
    });
  }


  render() {

    return (
      <Toggle initial={false} render={({ on, toggle }) => (

        <UserSlidingDrawerContext.Consumer>
          {({position, noOverlay, open, toggleDrawer, closeDrawer, onDrawerClose, setPosition, setNoOverlay}) => (

            <React.Fragment>

              <NavbarComponent
                toggleState={on}
                toggle={toggle.bind(this)}
                goToAccountSection={goToAccountSectionHandler}
                {...{toggleDrawer}}
                {...{closeDrawer}}
                {...this.props}
                {...this.state}
              />

              <UserSlidingDrawerViewComponent
                {...this.props}
                {...{open}}
                {...{position}}
                {...{noOverlay}}
                {...{closeDrawer}}
                {...{setPosition}}
                {...{toggleDrawer}}
                {...{setNoOverlay}}
                {...{onDrawerClose}}
              />

              </React.Fragment>

            )}
          </UserSlidingDrawerContext.Consumer>
        )} />
      )//END return()
    }//END render()
}///END class


function mapStateToProps(state) {
  return {
    loggedIn: state.authReducer1.isAuthenticated || state.authReducer1.authenticatedLocally
  };
}

export default TopNavComponent;
