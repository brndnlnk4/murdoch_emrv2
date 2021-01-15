import { Link, NavLink, Redirect } from "react-router-dom";
import React, { Component, Fragment } from "react";
import $ from "jquery";
import _ from 'lodash';
import moment from 'moment'
import PropTypes from 'prop-types'
import ReactImg from 'react-image'
import Multistep from 'react-multistep'
import { Toggle } from 'react-powerplug'
import LazyLoad from 'react-lazyload-fadein'
import PhoneInput from 'react-phone-input-2'
// import ValidForm from "react-validme -form-component";
import { Row, Form, Input, Label, Card, CardBody,ListGroupItem, ListGroupItemHeading,
        ListGroupItemText, CardHeader, CardFooter, Container, Col, Panel, Button, Badge, ButtonGroup,
        Carousel, CarouselItem, CarouselControl, DropdownToggle, DropdownMenu, DropdownItem,
        Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, CarouselsCaption, CarouselIndicators,
        Jumbotron, FormGroup, FormText, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody,
        ModalFooter, Popover, PopoverHeader, PopoverBody, ListGroup, CardImg, CardText, CardTitle,
        Collapse, UncontrolledCollapse, UncontrolledDropdown, Dropdown, Pagination, PaginationItem,
        PaginationLink,
      } from 'reactstrap';

// import Patients from './models/Patients';
// import { TreeView } from '@progress/kendo-react-treeview'
import { createBrowserHistory as history } from 'history/'

// import 'noti5'

/************************ VARS **************************/
const $authComponentNavLinks = ['/dashboard', '/patients', '/prescriptions']
const $accountDropdownLinks = ['settings',]
const $templateThemeColors = ['white', 'light', 'dark'];
const $accountDropdownLinksWithSubmenu = ({
      services: [
        {
          labServices: [
            {
              sampleTesting: [
                {'tissue': 55.00},
                {'blood': 55.00},
                {'unidentified': 55.00}
              ]
            },
            {
              panelTesting: [
                {'3 panel': 'THC, MDMA, GHB'},
                {'7-panel': 'THC, MDMA, GHB, THC, MDMA, GHB, '},
                {'10-panel': 'THC, MDMA, GHB, THC, MDMA, GHB, THC, MDMA, GHB'},
              ]
            },
          ],
        }
      ],
      pricing: [
        {
          labPrices: [
            {'blood test': 80.00},
            {'DNA test': 55.00},
            {'hair test': 55.00},
            {'tissue biopsy': 55.00},
          ]
        },
        {
          appointmentPrices: [
            {new: 55.00},
            {refill: 55.00},
            {physical: 55.00}
          ]
        },
        {
          supplementPrices: [
            {vitaminA: 55.00},
            {vitaminB: 55.00},
            {vitaminD: 55.00},
            {vitaminE: 55.00},
            {vitaminK: 55.00},
            {selenium: 55.00},
            {iron: 55.00},
          ]
        }
      ]
    })


/************************ SUBCOMPONENTS && PARTIALS **************************/
/**
 * [ModalViewContent description]
 * @param {Function}  toggle             toggle function used to enable-disable modal
 * @param {Object}  children             children compoonts
 * @param {Boolean} [on=false]           state of modal-visiblity
 * @param {Boolean} [backdrop=true]      background of modal can call toggle on click if set to 'true' else 'static'
 * @param {String}  [modalTitle='title'] modal header title text
 * @param {Object}  rest                 extra props to add to modal wrapperw
 */
export const ModalViewContent = ({ toggle, children, on=false, backdrop=true, modalTitle='title', modalSubTitle="sub title here", ...rest }) => {

  var modalId = `modal_${$('.modal').length}`;

  $(function() {
    const appContainerElm = $('#app-container').length ? $('#app-container') : $('#main');
    const toggleBlur = (el) => on ? el.addClass('filter-blur-5') : el.removeClass('filter-blur-5');
    const newlyCreatedModal = $(`#${modalId}`).parents('.modal');

    ($('.modal-content').length === 1) ? toggleBlur(appContainerElm) : toggleBlur(newlyCreatedModal)
  })

  return (
    <Modal isOpen={on} {...rest} {...{toggle}} {...{backdrop}} labelledBy={modalId} centered>
      <ModalHeader {...{toggle}} className="bg-light" id={modalId}>
        {modalTitle} {modalSubTitle ? (<FormText>{modalSubTitle}</FormText>) : ''}
      </ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      {rest.modalFooter ? (
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      ) : ('')}
    </Modal>
  )
};

export const DialogueViewContent = ({ headerTitle=false, headerText=false, ...rest }) => {

  const title = headerTitle ? _.trim(headerTitle) : 'headerTitle';
  const text = headerText ? _.trim(headerText) : 'headerText';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardText>{text}</CardText>mo
      </CardHeader>
      <CardBody>
        <Col size={{lg: 10, offset: 1}}>
          {rest.children ? rest.children : (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis dignissimos aliquid, explicabo. Eum commodi est, harum officia expedita, tenetur beatae quia voluptatum quisquam saepe natus aut nisi ipsum magnam suscipit.
            </p>
          )}
        </Col>
      </CardBody>
    </Card>
  );
  {/* ------------ modal togglerHandle example:
      $('.add-patient-modal-view-container').dialog({
        closeOnEscape: true,
        draggable: true,
        hide: true,
        modal: false,
        backdrop: true,
        width: 4
        height: 350,
        isOpen: function(data) {
          console.log(`data: ${data}`);
          // $('.ui-widget-overlay').css()
        },
        buttons: [
          {
            text: "Ok",
            click: function() {
              $(this).dialog("close")
            }
          }
        ]
      })
  */}
};

export const DashboardComponentModuleExpandedModal = () => (
  <Container className="module-expanded-modal-card-container collapse">
    <DialogueViewContent />
  </Container>
)

export const DashboardModuleCardHeader = ({ children, id: moduleName, ...rest }) => {
  // console.log("__id: ", moduleName)


  const toggleModuleExpandModalHandler = ({ target }) => {

    $('.module-expanded-modal-card-container').dialog({
      closeOnEscape: true,
      draggable: true,
      hide: true,
      modal: true,
      width: 400,
      height: 350,
      isOpen: function(data) {
        console.log(`data: ${data}`);
        // $('.ui-widget-overlay').css()
      },
      buttons: [
        {
          text: "Ok",
          click: function() {
            $(this).dialog("close")
          }
        }
      ]
    })
  };


  return(
    <CardHeader>

      <ButtonGroup className="pull-right text-muted" size="lg">
        <Button tag="a" className="p-md-0 pl-md-2 dashboard-module-draggable-handler" color="link">
          <FontAwesome name="expand" size="md" />
        </Button>
        <Button tag="a" className="p-md-0 pl-md-2 dashboard-module-edit" color="link" onClick={toggleModuleExpandModalHandler}>
          <FontAwesome name="edit" size="md" />
        </Button>
      </ButtonGroup>

      { children || <FontAwesome name='warning' color='danger' size='lg' />}

    </CardHeader>
  )//END return
}

export const RowWithLeftMenu = ({ children: [ LeftMenuComponent, ...OtherComponents ], leftMenuVisible=false }) => {

  const leftRightColWidthAdjustController = (colIndex=1) => {

    return (colIndex == 2) ? (
      //right section main body col
      (leftMenuVisible || $('#left-menu-container-section').hasClass('menu-open')) ? {xs:"12", lg:"11", className:"mt-4"} : {xs:"12", lg:"11", className:"mt-4 ml-0 pl-0"}
    ) : (
      //left menu section  col
      (leftMenuVisible || $('#left-menu-container-section').hasClass('menu-open')) ? {md:"1", className:"open pl-md-0 pr-0"} : {lg:"1", className: "pl-md-0"}
    )
  }///END fn()

  return(
    (LeftMenuComponent) ? (

      <Row>

        <Col {...leftRightColWidthAdjustController(1)}>
          { LeftMenuComponent }
        </Col>

        {(OtherComponents) ? (
          <Col {...leftRightColWidthAdjustController(2)}>
            { OtherComponents }
          </Col>
        ) : ''}

      </Row>

    ) : <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi ducimus repudiandae quia? Autem praesentium ratione excepturi laudantium, dolor maxime tempore, libero pariatur numquam sequi minus corporis porro cupiditate quae quam!</p>
  )
}

export const GuestNavContent = (props) =>{
  return(
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink className="nav-link" to="/login" title="Login or Create Account">
          Login <i className="fa fa-lg fa-sign-in" />
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export const AuthNavContent = (props) => {

  //set selected color attribute for <body> tag handler
  $(() => {
    const $colorsToChooseBtnGrp = $('#changeThemeColorBtnGrpElm')

    $colorsToChooseBtnGrp.on('click', 'button', function(e){
      let target = $(e.currentTarget)
      let color = $templateThemeColors[target.index()]
      let colorResolved = (color !== 'white' ? color : 'white')

      _.each($templateThemeColors, color => $('body').removeAttr(color));

      $('body').attr(colorResolved, "");
      $('body').find('.Nav').removeClass('navbar-dark navbar-light').addClass(`${colorResolved === 'dark' ? 'navbar-dark' : 'navbar-light'}`)

      target.addClass('disabled').siblings().removeClass('disabled');

    })//END onClick
  })///END $.ready

  const ThemeColorSelectionDropdownItem = () => {

    function getAttrBySelectedThemeColor(item='') {

      switch (item) {
        case 'light':
         return {
           btnAttr: {color: 'secondary', outline: false},
           faAttr: {color: 'dark'}
         }
        case 'dark':
         return {
           btnAttr: {color: 'dark', outline: false},
           faAttr: null
         }
        default:
        return {
          btnAttr: {color: 'secondary', outline: true},
          faAttr: {color: 'secondary'}
        }
      }//END switch
    }//END fn

    return (
      <React.Fragment>

        <DropdownItem tag="div" className='px-lg-2'>
          <ButtonGroup size='sm' id='changeThemeColorBtnGrpElm' title='Change Theme Color'>
            {
              (
                $.map($templateThemeColors, (item, key) => (
                  <Button {...getAttrBySelectedThemeColor(item).btnAttr} {...{key}}>
                    <FontAwesome name='list-alt' size='lg' {...getAttrBySelectedThemeColor(item).faAttr} />
                  </Button>
                ))
              )
            }
          </ButtonGroup>
        </DropdownItem>
        <DropdownItem divider />
      </React.Fragment>
    )//END return
  }
  const $pathname = props.pathName || props.pathname

  return (
    <Nav className="ml-auto" navbar>
      {[
        // mark current page===pathName as active
        ...$authComponentNavLinks.map((pg, key) => (

          <NavItem active={(_.first($pathname) === pg)} {...{key}}>
            <NavLink className="nav-link" to={`${pg}`}>{_.startCase(pg)}</NavLink>
          </NavItem>

        )//END NavItem
      ),
      (
        // *********** FLAGS OF COUNTRY ORIGIN DROPDOWN *****************
        <UncontrolledDropdown nav>
          <DropdownToggle nav caret color="link" className="mr-0 waves-effect waves-light nav-link">
            <ReactImg src={[`./assets/img/us.jpg`]} width="30px" className="rounded-circle" />
            <span className="align-middle pl-1 text-hide">English</span>
          </DropdownToggle>
          <DropdownMenu placement="right">
            <DropdownItem className="notify-item">
              <ReactImg src={[`./assets/img/germany.jpg`]} width="30px" className="rounded-circle" />
              <span className="align-middle pl-1">German</span>
            </DropdownItem>

            <DropdownItem className="notify-item">
              <ReactImg src={[`./assets/img/italy.jpg`]} width="30px" className="rounded-circle" />
              <span className="align-middle pl-1">Idividertalian</span>
            </DropdownItem>

            <DropdownItem className="notify-item">
              <ReactImg src={[`./assets/img/spain.jpg`]} width="30px" className="rounded-circle" />
              <span className="align-middle pl-1">Spanish</span>
            </DropdownItem>

            <DropdownItem className="notify-item">
              <ReactImg src={[`./assets/img/russia.jpg`]} width="30px" className="rounded-circle" />
              <span className="align-middle pl-1">Russian</span>
            </DropdownItem>

          </DropdownMenu>
        </UncontrolledDropdown>
      ),
      (
        // *********** NOTIFICATIONS-MESSAGES DROPDOWN *****************
          <UncontrolledDropdown nav className="notification-list" direction="left">
            <DropdownToggle nav className="nav-link waves-effect waves-light" color="link">
              <i className="dripicons-bell noti-icon"></i>
              <span className="badge badge-info noti-icon-badge">21</span>&nbsp;
              <FontAwesome name="caret-down" />
            </DropdownToggle>
            <DropdownMenu>

              <DropdownItem className="noti-title">
                <h5 className="m-0">
                  <span className="float-right">
                    <a href="" className="text-dark">
                      <small>Clear All</small>
                    </a>
                  </span>Notification
                </h5>
              </DropdownItem>

              <DropdownItem className="notify-item active">
                <div className="notify-icon bg-warning"><i className="fa fa-comment-account-outline"></i> </div>
                <p className="notify-details">Caleb Flakelar commented on Admin<small className="text-muted">1 min ago</small></p>
              </DropdownItem>

              <DropdownItem className="notify-item">
                <div className="notify-icon bg-info"><i className="fa fa-account-plus"></i></div>
                <p className="notify-details">New user registered.<small className="text-muted">5 hours ago</small></p>
              </DropdownItem>

              <DropdownItem className="notify-item">
                <div className="notify-icon">
                  <ReactImg src={[`./assets/img/BrandonModelpic.jpg`]} width="30px" className="rounded-circle" />
                </div>
                <p className="notify-details">Cristina Pride</p>
                <p className="text-muted mb-0 user-msg">
                  <small>Hi, How are you? What about our next meeting</small>
                </p>
              </DropdownItem>

              <DropdownItem className="notify-item">
                <div className="notify-icon bg-danger"><i className="fa fa-comment-account-outline"></i></div>
                <p className="notify-details">Caleb Flakelar commented on Admin<small className="text-muted">4 days ago</small></p>
              </DropdownItem>

              <DropdownItem className="notify-item">
                <div className="notify-icon">
                  <ReactImg src={[`./assets/img/BrandonModelpic.jpg`]} width="30px" className="rounded-circle" />
                </div>
                <p className="notify-details">Karen Robinson</p>
                <p className="text-muted mb-0 user-msg">
                  <small>Wow that's great</small>
                </p>
              </DropdownItem>

              <DropdownItem className="notify-item">
                <div className="notify-icon bg-primary">
                  <i className="fa fa-heart"></i>
                </div>
                <p className="notify-details">Carlos Crouch liked
                  <b>Admin</b>
                  <small className="text-muted">13 days ago</small>
                </p>
              </DropdownItem>

              <DropdownItem className="text-center text-primary notify-item notify-all">
                View all
                <i className="fi-arrow-right"></i>
              </DropdownItem>

            </DropdownMenu>
          </UncontrolledDropdown>
      ),
      (
        // *********** THEME-COLOR & ACCOUNT OPTIONS DROPDOWN *****************
        <UncontrolledDropdown nav className="notification-list" direction="down" setActiveFromChild>
          <DropdownToggle className="mr-0 waves-effect waves-light nav-link" color="link">
            <ReactImg src={[`./assets/img/anonmask.jpg`]} height="30px" className="rounded-circle" />
            <span className="pro-user-name ml-1">
              Agnes K <i className="fa fa-chevron-down"></i>
            </span>
          </DropdownToggle>

          <DropdownMenu className="profile-dropdown" persist>
            <DropdownItem header className="text-center noti-title bg-light">
              <FontAwesome name="adjust" />
            </DropdownItem>

            <ThemeColorSelectionDropdownItem />

            <DropdownItem header className="text-center noti-title bg-light">
              <FontAwesome name="user-circle-o" />
            </DropdownItem>

            { ////**************  dropdown nested menu items  **************//////
              $accountDropdownLinks.concat($accountDropdownLinksWithSubmenu).map((menuItem, key) => (
                _.isObject(menuItem)
              ) ? (
                renderDeepMenuItems({...menuItem, key})
              ) : (
                <NavLink key={`k${key}`} to={`/account/${menuItem}`} className="dropdown-item btn btn-secondary" onClick={(e) => props.goToAccountSection}>
                {_.upperFirst(menuItem)}
              </NavLink>
            ))//END map
          }

          <DropdownItem className="notify-item">
            <i className="dripicons-help"></i>
            <span>Support</span>
          </DropdownItem>

          <DropdownItem divider />

          <DropdownItem className="notify-item" onClick={() => {window.location.replace("/logout")}}>
          <i className="dripicons-power"></i>
          <span>Logout</span>
        </DropdownItem>

      </DropdownMenu>
    </UncontrolledDropdown>
      ),
      (
        <Button type="button" color="link" size="sm" id="rightSlidingDrawerToggleBtn" onClick={props.toggleDrawer}>
          <FontAwesome name="bars" size="lg" />
        </Button>
      ),
    ]}
  </Nav>
  )//END return
}///END AuthNavContents

export const NavbarComponent = ({ toggleState, toggle, ...rest }) => {

  const { loggedIn, pathname } = rest
  const loggedOutChk = (pathname || window.location.pathname) === '/'
  const navbarClasses = loggedOutChk ? "Nav border-secondary" : "Nav"
  const bodyThemeColor = document.body.attributes.length && document.body.attributes[0].name;

  return(

    <Navbar
      className={`row ${navbarClasses} ${bodyThemeColor && bodyThemeColor === 'dark' ? ' navbar-dark' : ' navbar-light'}`}
      role="navigation"
      expand="md"
      id="myNav"
    >

      {/* leftside navbar brand btn */}
      {(loggedIn || !_.isEmpty(getCookie('auth'))) ? (
        <NavLink to="/dashboard" className="navbar-brand">
          <i className="fa fa-stethoscope" />
        </NavLink>
      ) : (
        <NavLink to="/" className="navbar-brand">
          <i className="fa fa-lg fa-home" />
        </NavLink>
      )}

      {/* navbar toggleBtn for mobile-responsive view */}
      <NavbarToggler onClick={toggle} id="navToggler" />

      {/* main navbar with rigtside links */}
      <Collapse isOpen={toggleState} navbar>
        {
          (loggedIn || !_.isEmpty(getCookie('auth'))) ? (
            <AuthNavContent {...rest} />
          ) : (
            <GuestNavContent {...rest} />
          )
        }
      </Collapse>
    </Navbar>
  )
}///END NavbarComponent

export const Img = ({ src=false, loader:Loader=false, className=false }) => {

  Loader = (Loader) ? (() => '') : (() => <i className="p-2 fa fa-3x fa-spinner fa-pulse text-center" />);

  return(
    <ReactImg
      src={src || null}
      loader={<Loader />}
      className={className || null}
    />
)//END return
}

// export const MyTreeView = ({ data, size=false, ...rest }) => {
//
//   return(
//     <Row>
//       <Col {...size}>
//         <Card className={`border-0`}>
//           <CardBody>
//             treeview data shows here
//             <TreeView
//               {...rest}
//               {...{data}}
//             />
//           </CardBody>
//         </Card>
//       </Col>
//     </Row>
//   )
// }

export const PaginatedFooterSection = ({ totalItemCount, currentActivePg=0, amtPerRow=3, maxRowCountPerPg=4, onClick=false }) => {
  let rowCountPerPage = window.rowCountPerPage = _.chunk(_.range(totalItemCount), amtPerRow)
  let totalPageCount = window.totalPageCount = _.chunk(_.range(1, rowCountPerPage.length), maxRowCountPerPg).length

  return (
    <Pagination size="lg" aria-label="Page navigation example">
      <PaginationItem disabled={(currentActivePg <= 1)} title={`curtotalItemCount: ${totalItemCount} / rowCntPerPg: ${rowCountPerPage} / totalPageCount: ${totalPageCount}`}>
        <PaginationLink previous href="#" onClick={() => onClick ? onClick(currentActivePg - 1) : ''} />
      </PaginationItem>
      {
        _.range(totalPageCount).map((item,key, arr) => {
          item++
          return (
            <PaginationItem active={(currentActivePg === item)} {...{key}}>
              <PaginationLink href="#" onClick={() => onClick ? onClick(item !== currentActivePg ? item : '') : ''} >
                {item}
              </PaginationLink>
            </PaginationItem>
          )}) || (<b>1</b>)
      }
      <PaginationItem disabled={(currentActivePg >= totalPageCount)}>
        <PaginationLink next href="#" onClick={() => {onClick ? onClick(currentActivePg + 1) : ''}} />
      </PaginationItem>
    </Pagination>
  );
}///END  paginatinSecion

export const AddNewPatientViewContent = (props) => {

  $(function() {
    const ptModalViewContainer = $('.add-patient-modal-view-container');

    $('[data-address-row="1"]').find(".remove-addr").hide();
    $('[data-allergy-row="1"]').find(".remove-allergy").hide();

    ptModalViewContainer.find('button').addClass('btn')
    ptModalViewContainer.find('input').eq(0).focus()
  })

  const addNewAllergyHandler = (data) => {
    let allergyRows = $('[data-allergy-row]')
    let lastAllergyRow = allergyRows.last()
    let $allergyCloneHTML = lastAllergyRow.clone()

    if(!_.some(Array.from(lastAllergyRow.find('select')), (elm, ind) => (_.isEmpty($(elm).val())))) {
      $allergyCloneHTML.on('change', "[name='allergyType']", ({ target: {value: v} }) => v && props.addAllergyInformationHandler(v));
      $allergyCloneHTML.on('click', ".remove-allergy", removeAllergy)
      $allergyCloneHTML.attr('data-allergy-row', allergyRows.length+1)
      $allergyCloneHTML.find(".remove-allergy").show();
      $allergyCloneHTML.insertAfter(lastAllergyRow)
    } else{
      popUpMsg(_.upperCase('must have previously saved allergy information'), '', true)
    }
  }

  const addNewAddressHandler = (e) => {
    let addressRows = $('[data-address-row]')
    let lastAddressRow = window.lastAddressRow = addressRows.last()
    let $addressRowCloneHTML = lastAddressRow.clone()

    if(!_.some(Array.from(lastAddressRow.find('input, select')), (elm, ind) => (_.isEmpty($(elm).val()) && $(elm).val().length < 3))) {
      $addressRowCloneHTML.on('click', ".remove-addr", removeAddress);
      $addressRowCloneHTML.find('select, input').val('').prop('checked', false)
      $addressRowCloneHTML.attr('data-address-row', addressRows.length+1)
      $addressRowCloneHTML.insertAfter(addressRows.last())
      $addressRowCloneHTML.find(".remove-addr").show();
    } else{
      popUpMsg(_.upperCase('must have previously saved address'), '', true)
      $(e.target).parents('.modal-conte/patientsnt').bounce()
    }
  }

  const removeAddress = (e) => {
    console.log(`remove address: `, e.target);
  }

  const removeAllergy = (e) => {
    console.log(`remove allergy: `, e.target);
  }

  $("#birthdayCalenderOutputContainer").datepicker({
    inline: true,
    maxDate: "-12y",
    onSelect: (stringDate, dateObj) => {
      console.log(`_____---- date string: ${stringDate} / obj: `, dateObj)
    }
  })///END datePicker()
  // $.datepicker.formatDate( "yy-mm-dd", new Date( 2007, 1 - 1, 26 ) )
  // nosubmit Disable auto submit.
  // novalid "onSubmit" event is also triggered when the form is not valid.
  // data Default form elements value.

  return(
    <Container className='add-patient-modal-view-container'>

      <ValidForm novalid nosubmit fetch={() => console.log(`\n__new pt ajax-fetch attempt made__`)} onSubmit={props.submitNewPatientDataHandler}>

        <Multistep showNavigation={true} initialStep={1} steps={
          [
            {name: 'BasicInformation', component: (
              <section data-add-patient-section="0">
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">First Name</Label>
                      <Input tabIndex="1" type="name" name="firstName" id="exampleFirstName" placeholder="first name" maxLength="50" letters="true" autoFocus required />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplePassword">Last Name</Label>
                      <Input tabIndex="2" type="name" name="lastName" id="exampleLastName" placeholder="last name" maxLength="50" letters="true" required />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col lg={{size: 8}}>
                    <FormGroup>
                      <Label for="birthdayCalenderOutputContainer">
                        Birthday
                      </Label>
                      <Input tabIndex="3" type="date" name="birthday" id="exampleBirthday" required />
                      {/* <div title="Select date of birth" id="birthdayCalenderOutputContainer"></div> */}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="gender">Gender</Label>
                      <Input tabIndex="4" type="select" name="gender" id="gender" defaultValue="Male" required>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Pet</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="maidenName">Maiden Name</Label>
                      <Input tabIndex="5" type="name" name="maidenName" id="exampleMaidenName" placeholder="with a placeholder" letters="true" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="nickName">Nick Name</Label>
                      <Input tabIndex="6" type="name" name="nickName" id="exampleNickName" placeholder="with a placeholder" letters="true" />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="bg-gradient-vertical-light">
                  <Col md={{size: 8, offset: 2}} sm="12">
                    <FormGroup>
                      <Label for="examplePhoneNumber1">Primary Number</Label>
                      <PhoneInput
                        value={null}
                        country="us"
                        onlyCountries={['us', 'mx', 'de']}
                        regions={['north-america','central-america', 'south-america', 'europe']}
                        onChange={phone => console.log(`\n -->> phone: ${phone}`)}
                        inputClass="form-control"
                        inputProps={{
                          tabIndex: "7",
                          required: true,
                          id: "primaryPhoneNumber",
                          name: "primaryPhoneNumber",
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={{size: 8, offset: 2}} sm="12">
                    <FormGroup>
                      <Label for="examplePhoneNumber2">Secondary Number</Label>
                      <PhoneInput
                        value={null}
                        country="us"
                        onlyCountries={['us', 'mx', 'de']}
                        regions={['north-america','central-america', 'south-america', 'europe']}
                        onChange={phone => console.log(`\n -->> phone2: ${phone}`)}
                        inputClass="form-control"
                        inputProps={{
                          tabIndex: "8",
                          id: "secondaryPhoneNumber",
                          name: "secondaryPhoneNumber",
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </section>
            )},
            {name: 'AddressInformation', component: (
              <section data-add-patient-section="1">

                <hr/>

                {/* address input */}
                <section data-address-row="1">
                  <span className="d-block text-secondary"><h4>patient address</h4></span>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>&nbsp;Address</Label>
                        <span className="pull-right" title="Primary Address">
                          <Label for="setAsPrimaryAddress" className="col-lg-10 col-md-10"><FontAwesome name="home" size="lg" /></Label>
                          <Input tabIndex="9" type="radio" className="col-lg-2 col-md-2" name="setAsPrimaryAddress" id="setAsPrimaryAddress" value={(`primary_address_1`)} />
                        </span>

                        <Button type="button" color="link" size="sm" title="Delete Address" className="remove-addr" onClick={removeAddress}>
                          <FontAwesome name="remove" size="lg" />
                        </Button>

                        <Input tabIndex="10" type="text" name="address_1" id="address_1" placeholder="1234 Main St" minLength="5" alphanumeric="true" />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleCity">City</Label>
                        <Input tabIndex="11" type="text" name="city" id="exampleCity" maxLength="50" letters="true" />
                      </FormGroup>
                    </Col>
                    <Col md={4}>1
                      <FormGroup>
                        <Label for="exampleState">State</Label>
                        <Input tabIndex="12" type="text" name="state" id="exampleState" maxLength="25" letters="true" />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="exampleZip">Zip</Label>
                        <Input tabIndex="13" type="text" name="zip" id="exampleZip" minLength="7" maxLength="9" number="true" numeric="true" />
                      </FormGroup>
                    </Col>
                  </Row>
                </section>
                <Row className="bg-gradient-vertical-light">
                  <Col lg={{size: 6, offset: 3}} md={{size: 8, offset: 2}} sm={{size: 12}}>
                    <Button color="link" type="button" title="New Address" block onClick={addNewAddressHandler}>
                      New Address <br/>
                      <FontAwesome name="plus" size="lg" />
                    </Button>
                  </Col>
                </Row>
              </section>
            )},
            {name: 'AllergyInformation', component: (
              <section data-add-patient-section="2">

                <hr/>

                {/* allergy information */}
                <section data-allergy-row="1">
                  <span className="d-block text-secondary"><h4>patient allergies</h4></span>
                  <Row>
                    <Col>
                      <FormGroup className="d-inline-flex justify-content-around w-100">
                        <span className="w-75">
                          <Label for="allergyType">Allergy Type</Label>
                          <Input tabIndex="14" id="allergyType" name="allergyType" type="select" defaultValue="" onChange={({ target: {value: v} }) => v && props.addAllergyInformationHandler(v)}>
                            <option value="" className="allergyType_0">None</option>
                            <option className="allergyType_1">allergyType_1</option>
                            <option className="allergyType_2">allergyType_2</option>
                            <option className="allergyType_3">allergyType_3</option>
                            <option className="allergyType_4">allergyType_4</option>
                            <option className="allergyType_5">allergyType_5</option>
                          </Input>
                        </span>
                        <span className="align-self-end w-auto">
                          <Button type="button" className="text-danger remove-allergy" color="link" title="Delete Allergy" onClick={removeAllergy}>
                            <FontAwesome name="remove" size="lg" />
                          </Button>
                        </span>
                      </FormGroup>
                    </Col>
                  </Row>
                </section>

                <Row className="bg-gradient-vertical-light">
                  <Col lg={{size: 6, offset: 3}} md={{size: 8, offset: 2}} sm={{size: 12}}>
                    <Button color="link" type="button" title="New Allergy" block onClick={addNewAllergyHandler}>
                      New Allergy <br/>
                      <FontAwesome name="plus" size="lg" />
                    </Button>
                  </Col>
                </Row>

                {/* submit or reset form input */}
                <Row className="pt-4 bg-gradient-bottom-light border-top border-light">
                  <Col lg={{size: 4, offset: 4}}>
                    <ButtonGroup>
                      <Button tabIndex="15" title="Add New Patient" size="lg" color="success" type="submit">
                        Add
                      </Button>
                      <Button tabIndex="16" title="Clear Form Input" color="success" type="reset" outline>
                        <FontAwesome name="undo" />
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </section>
            )},
          ]
        } />
      </ValidForm>

    </Container>
  ); ///END ModalView
};////AddNewPatientView


/************************ MOMENT FUNCTIONS **************************/
// !! REMEMBER: moment('...') === 'moment.parse(...)' && moment.fn(...) === 'moment instance/prototype'
export const getRandomBirthday = () => moment(new Date() - _.random(0, moment())).format('L')

export const getRandomDay = () => moment().day((_.random(7))).format('dddd')


/************************ EXTRA FUNCTIONS **************************/
export const upload = (uploadsDir, fileName, file={}) => ({
	storage: multer.diskStorage({
		destination: (req, file, next) => {

			fs.existsSync(uploadsDir) || fs.mkdirSync(uploadsDir)

			next(null, uploadsDir)///NEXT(ERR, IMAGE_PATH	)
		},
		filename: (req, file, next) => {
			const ext = file ? file.mimetype.split('/')[1] : 'jpg'

			console.log(`+++++ file fieldName: ${file.fieldname} \n\n +++++++file ext: ${ext} \n\n `, file);

			next(null, `${fileName}.${ext}`)
		}
	})
});

export const getPatientFileDataInDir = ($dir = '') => (

  async () => {
    // console.log(`>>>>> scripts.jsx getPatientFileDataInDir for dir: ${$dir} <<<<<<`);
    let selPtInfo;

    switch (typeof $dir) {
      case 'object':
        // USE REDUX STATE AND STORE TO READILY ACCESS PT_DATA OBTAINED VIA AXIOS...
        // selPtInfo = await Patients.dataForDirs($dir);
        return selPtInfo.data
      break;
      case 'string':
        // USE REDUX STATE AND STORE TO READILY ACCESS PT_DATA OBTAINED VIA AXIOS...
        // selPtInfo = (_.isEmpty($dir)) ? await Patients.allData() : await Patients.dirData($dir);
        return selPtInfo.data;
      break;
      default:
        return false;
      break;
    } //END switch
  }////END async fn
)()///END IIFE

export const reformattedPatientDataForTreeview = (data) => {

  return Patients.reformattedPatientDataForTreeview(data) || data
}


export const validate_token = function($ = false,axios = false){
  if (document.querySelector("[name='csrf-token']")) {
    let token = document.querySelector("[name='csrf-token']");

    if($) $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN' : token.content,
        'X-Requested-With' : 'XMLHttpRequest'
      }
    });

    if(axios){
      axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    };
  } else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');

    return false;
  }
}

/**
 * uploadPicViaAjaxSubmit upload file via ajax using AjaxSubmit API
 * @param  {node|element}  $formElm                             [description]
 * @param  {string}  url                                  [suck my balls]
 * @param  {Boolean} [$extraDataToAdd=false]              [description]
 * @param  {Boolean} [percentUploadedVarToUpdateFn=false] [description]
 * @return {upload instance}                                       instance of uploading process
 */
export function uploadPicViaAjaxSubmit($formElm, url, $extraDataToAdd=false, percentUploadedVarToUpdateFn=false){
  /* INSTANTIATE/(SAVE4LATER) SHIT NEEDED LATER HERE 4 REST OF OBJECT/CLASS 2 REFERENCE */
  this.url = url
  this.formElm = $formElm
  this.extraDataKeyValObj = ($extraDataToAdd) ? $extraDataToAdd : false
  this.upload = (OnUploadDoneCallback=false) => {

    if(!this.url || !typeof this.formElm === 'object') return

    $formElm.ajaxSubmit({
      url,
      type: "POST",
      beforeSubmit: function (arr) {
        if($extraDataToAdd && Array.isArray($extraDataToAdd)) $extraDataToAdd.forEach(token => arr.push(token))
        else if($extraDataToAdd && typeof $extraDataToAdd === 'object') arr.push($extraDataToAdd)
      },
      uploadProgress: function (e, position, total, percentDone) {
        console.log("_percent uploaded: %s\%",percentDone)
        //      updatePicUploadProgressState(percentDone)
        if(percentUploadedVarToUpdateFn) percentUploadedVarToUpdateFn(percentDone)
      },
      success: (data, textStatus, jqXHR) => {
        if(jqXHR.status == 200){
          //          console.log("____upload done data: %o",data)

          if(OnUploadDoneCallback && _.isFunction(OnUploadDoneCallback)) OnUploadDoneCallback(data)
          return {status: 'ok'}
        }else console.log("upload XHR failed with XHRstatus: %s",jqXHR.status)//END ifelse
      },//END ifSuccess
      error: err => {
        console.log("upload failed with err: ", err.responseText)
        return {status: 'fail', error: err.responseText}
      }///END ifError
    })///END $.ajaxSubmit($picUpload)
  }
}

export const owlCarousel = function(element){
  ////INSTALL OWL API
  this.element = $(element);
  this.loop = true;
  this.nav = false;
  this.dots = true;
  this.autoplay = true;
  this.pauseOnHover = true;

  this.element.owlCarousel({
    loop: this.loop,
    margin: 0,
    nav: this.nav,
    dots: this.dots,
    dotsSpeed: 300,
    autoplay: this.autoplay,
    autoplayTimeout: 10000,
    autoplayHoverPause: this.pauseOnHover,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });
}


/************************ MISC **************************/
export const popupAboveElement = (msg, elmSelector, popUpDangerInfoSuccess = false)  => {
  var element = $(elmSelector),
  msg = $.trim(msg),
  popupElm;

  switch ($.trim(popUpDangerInfoSuccess).toLowerCase()) {
    case 'danger':
    popupElm = $("<div class='popUpToolTip popUpTooltipDanger'>x" + msg + "</div>")
    break;
    case 'info':
    popupElm = $("<div class='popUpToolTip popUpTooltipInfo'>" + msg + "</div>")
    break;
    case 'success':
    popupElm = $("<div class='popUpToolTip popUpTooltipSuccess'>" + msg + "</div>")
    break;
    case 'muted':
    popupElm = $("<div class='popUpToolTip popUpTooltipMuted'>" + msg + "</div>")
    break;
    default:
    popupElm = $("<div class='popUpToolTip popUpTooltipDefault'>" + msg + "</div>")
    break;
  } ///END switch

  const Elm = element[0].previousElementSibling;

  if(Elm){
    if(!$(Elm).hasClass('popUpToolTip')) popupElm.insertBefore(element)
  }else popupElm.insertBefore(element)

  setTimeout(function () {
    popupElm.fadeTo('slow', '0', function () {
      popupElm.remove();
    })
  }, 1500);
  //  console.log("executing popUpAboveElement!!!")
}

export const ucWords = (s,fallback=false) => {
  if ($.trim(s) && typeof s == 'string') {
    var w = s.split(' '),
    s = '';
    for (var i = 0; i < w.length; i++) {
      s += w[i].charAt(0).toUpperCase() + w[i].substr(1) + ' ';
    } ///END 4loop
  }else{
    return fallback;
  } ///END if
  return $.trim(s);
}

export const queryParamToJson = ($_GET) => {
  var params = {},
  prmarr = $_GET.split("&");
  for (var i = 0; i < prmarr.length; i++) {
    let tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1]; ///set keyName=>val ex:just like in php $array[keyName]=>val
  }
  return params;
}

export const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();

  d.setTime(d.getTime() + (exdays * 24 * 3600 * 1000)); ////exdays * 24hrs(miliseconds)
  var expires = "expires=" + d.toUTCString(); ///format to standard d8 4mat (dd-mm-yyyy) strng
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
  var name = cname + "="
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length);
    }
  }
  return false;
}

export const validate = {
  email(emailOrPhone) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(emailOrPhone);
  },
  phone(emailOrPhone) {
    var re = /\d{3}-\d{3}-\d{4}/g;

    return (re.test(emailOrPhone))
  }
}

/**
 * Display pop up message using $.noti5 by default or original style if noti5 unavailable
 * @param  {String}  msg              message to display
 * @param  {String} [title=false]    title to display in header
 * @param  {String} [bgColor=false]  bootstrap layout color (info, warning, danger...)
 * @param  {Boolean} [fixedPos=false] (only applies to original popup-style I created)
 * @return {[type]}                   [description]
 */
export const popUpMsg = function(msg, title = false, bgColor = false, fixedPos = false) {

  if($.noti5 instanceof Function) {

  $.noti5({
    'title': title || 'Hey!',
    'message': msg || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'type': bgColor || 'danger',
    'timeout': 4,
    'pos': 'top-right',
    'elementPos': 'right',
    'link': {
        'href': '#',
        'title': '',
        'target': '_blank'
    },
    'offset': 0,
    // or
    // 'offset': {
    //   'x': 0,
    //   'y': 0
    //}
    'spacing': 5,
    'showCloseBtn': true
  });
  return;
}

  if ($("#msgSntPopup").length === 0) {
    let elm = $("<span id='msgSntPopup' class='text-center'><h1 class='text-center'></h1></span>");

    if (bgColor) {
      elm.css('background-color', bgColor);
    } else {
      elm.addClass('ui-widet ui-state-error')
    }

    if(fixedPos){
      elm.css({
        'position': 'fixed',
        'width': '100%',
        'top': '50px',
        'color':'#fff',
        'zIndex': '3700',
        'filter': 'blur(0px)',
        'boxShadow': '0px 2px 4px #888',
        'paddingTop': '8px',
        'paddingBottom': '8px'
      })
    }///END if

    elm.insertAfter($('.modal').length ? '.modal' : "nav");
  }///END if
  ///////POP UP A MSG THAT FADES OUT
  setTimeout(() => {
    let elm = $('#msgSntPopup')

    elm.children('h1').html(msg);
    elm.fadeIn('fast', function () {
      elm.fadeIn('fast', function () {
        elm.delay(1500).fadeTo('1', 3000, function () {
          elm.fadeOut("slow");
          elm.remove();
        });
      })
    }) /////END fx
  }, 200);
}

export const FontAwesome = ({ name='user-circle', size='1x', color='secondary', ...rest }) => {

  return(
    <span className={`fa fa-${name} fa-${size} text-${color}`}>
      {rest.children}
    </span>
  )}

export const resetTooltipEventListeners = ($tooltipNodeParent=false) => {
  $tooltipNodeParent = (!$tooltipNodeParent) ? $('body') : $tooltipNodeParent
  $(() => {
    (_.isString($tooltipNodeParent)) ? $($tooltipNodeParent).find("[data-toggle='tooltip']").tooltip() : $("[data-toggle='tooltip']").tooltip()
  })
}

export const createAuthCookie = (body, expiration=960000) => ([
  "auth",
  JSON.stringify({...body}),
  {maxAge: 960000, expires: moment(moment()).add(expiration).milliseconds}
]);

export const renderDeepMenuItems = (menuData, key='') => (

  _.isObjectLike(menuData) && _.some(menuData, item => _.isObjectLike(item))) ? (

    <div {...{key}}>

    {_.map({...menuData}, (menuItem, itemKey) => (

      <div key={`_${itemKey}`}>
        <Toggle initial={false} render={({ on: isOpen, toggle }) => (

          <Dropdown {...{isOpen}} {...{toggle}} direction="left" className="w-100" setActiveFromChild>
            <DropdownToggle className="dropdown-item" onClick={() => toggle}>{_.upperFirst(itemKey)}</DropdownToggle>

            <DropdownMenu persist>
              { _.map(menuItem, (subMenuItem, key) => renderDeepMenuItems(subMenuItem, key)) }
            </DropdownMenu>

          </Dropdown>

        )} />
      </div>
    ))}
  </div>
  ) : (
    <ListGroup {...{key}} flush>
      {
        _.map(menuData, (val,key) => (

          <ListGroupItem {...{key}}>
            <ListGroupItemHeading color="info">{_.upperFirst(key)}</ListGroupItemHeading>
            <ListGroupItemText>{_.trim(val)}</ListGroupItemText>
          </ListGroupItem>
        )
      )}
    </ListGroup>
  )


// **************  COMPONENT HELPERS && 'INTERFACES'  *****************
export const dashboardDraggableModuleOptions = {
  items: "> li",
  revert: false,
  cursor: "grabbing",
  handle: ".card-header",
  connectToSortable: "#left-menu-nav-elm",
}

export const dashboardSortableModuleOptions = {
  // items: "> li",
  // helper: "clone",
  revert: true,
  opacity: 0.8,
  cursor: "grabbing",
  accept: "li.droppable",
  tolerance: "pointer",
  connectWith: ".droppable",
}

export const leftMenuSortableNavItemsOptions = {
  axis: "y",
  revert: true,
  opacity: 0.8,
  cursor: "grabbing",
  accept: "li.droppable",
  tolerance: "intersect",
  items: "> li:not(:first-child):not(:nth-child(2))",
  //  connectWith: "#member_body_modules_container",
  onReceive: (event, ui) => {
    // if(ui.item.hasClass("droppable")) ui.item.addClass("left-menu-item");

    console.log("\n ____ leftMenuSortable onReceive() called")
  },
  onRemove: (event, ui) => {
    ui.item.removeClass("left-menu-item")

    console.log("\n ____ leftMenuSortable onRemove() called")
  },
  onSort: (event, ui) => {
    /*
    switch out top 'first-child' nav-item into droppable trash elm for accepting left-menu droppables to remove from list
    */
    console.log("\n ____ leftMenuSortable onSort() called")
  },
  onChanged: (event, iu) => {
    console.log("\n ____ leftMenuSortable onChanged() called")
  }
}

export const formattedDirText = (text) => {

  let dirSplitArr = text.charAt('/') && text.split('/')
  let substrToExcludeFromText = [...(_.range(5).map(ind => dirSplitArr[ind]))].join('/')
  let dirToGetWithoutRootPath = _.rimStart(text, _.trim(substrToExcludeFromText))

  return console.log(`______selected dir arr: ${dirToGetWithoutRootPath}`) && dirToGetWithoutRootPath
}///END fn

export const parseAndDisplayItemByType = (data='') => {

  var ext = (data.lastIndexOf('.') > 0) ? data.substr(data.lastIndexOf('.')) : data
  var imgCheck = ext && ['.jpg', '.jpeg', '.png'].includes(_.trim(ext).toLowerCase())
  var imgSrc = imgCheck ? `./assets/img/${data}` : ''
  var fileInfo = window.fileInfo = imgCheck ? new FileReader() : false //fileInfo.readAsDataURL(): read as blob
  var DataImage = imgCheck ? ([
    <CardHeader>
      <CardImgOverlay className="text-right">
        <CardTitle><small>`image: ${data}`</small></CardTitle>
        <CardText>`Image Dimensions: ${String(fileInfo)}`</CardText>
      </CardImgOverlay>

      <Img
        unloader={<FontAwesome name="spinner fa-pulse" size="4x" />}
        height="200px"
        src={[
          `${data}`,
          `${imgSrc}`
        ]}
      />
    </CardHeader>
  ]) : data

  return DataImage;
}

export const LazyLoadedComponentWrapper = ({ component:Component, offset=200, duration=600, height=600, onload, ...rest }) => {
  if(!Component && !rest.children) return;

  return (
    <LazyLoad
      {...{duration}}
      {...{offset}}
      {...{height}}
      once={false}
      resize={false}
      unmountIfInvisible={false}
      render={(onload) => (rest.children) ? rest.children : <Component {...rest} {...{onload}} />}
     />
  );
};

/** @type {Object} [ModelInterface provides helper functions for model] */
export const ModelInterface = {
/**
 * queryBuilder helper for building mySQL statements
 * @param  {string} $tableSelected database table to use
 * @return {string}         complete mySQL statement]
 */

  query($tableSelected) {

    return {
      qry: '',
      query: this.qry,
      condition: [$tableSelected==='patients' ? 'WHERE deleted_at IS NULL' : ''],
      stringifyCondition(cond=[]) {
        cond = cond.length ? cond : this.condition

        return _.filter(cond).length ? `${_.map(_.uniq(_.isArray(cond) ? cond : [cond]), (val) => val).join(' AND ')}` : ''
      },
      where(whereFld, whereVal) {
        let key = _.isObject(whereFld) ? _.keys(whereFld)[0] : _.trim(whereFld) || false
        let val = _.isObject(whereFld) ? whereFld[key] : _.trim(whereVal) || false
        let cond = `${$tableSelected && 'AND'} ${key} = '${val}'`

        if(!key && !val) return this;
        else this.condition = this.condition.concat(cond)

        this.qry = `${this.qry} ${this.stringifyCondition(cond)}`

        return this
      },
      select(fldToSel=null, ...otherFields) {
        this.qry = `
        SELECT ${[fldToSel || '*', ...otherFields || '']}
        FROM ${$tableSelected}
        ${this.stringifyCondition()}
        `
        return this
      },
      insert(fldNameToFldVal={}) {
        this.qry = (!_.isEmpty(fldNameToFldVal)) && `
        INSERT INTO ${$tableSelected}
        SET
        ${ _.map(fldNameToFldVal, (val, key) => (key + "=" + "'"+val+"'")).join(',') }
        `
        return this
      },
      count(fldToSel=false, whereKey2Val={}) {
        this.qry = `
        SELECT COUNT(${fldToSel || '*'}) AS 'count'
        FROM ${$tableSelected}
        ${!_.isEmpty(whereKey2Val) ? (
          ' WHERE '+_.first(_.keys(whereKey2Val))+'='+whereKey2Val[_.first(_.keys(whereKey2Val))]
        ) : (
          ''
        )}
        `
        return this
      },
      limit(lim=false, ofst=false) {
        lim = (lim && Number(lim))
        ofst = (ofst && Number(ofst))
        this.qry = `${this.qry} ${lim ? 'LIMIT '+lim : ''} ${ofst ? 'OFFSET '+ofst : ''}`

        return this
      },
    }
  }///END  query
}


// **************  PROPTYPES FOR ABOVE VARS   *****************
// MyTreeView.propTypes = {
//   data: PropTypes.array.isRequired || PropTypes.object.isRequired,
//   onExpandChange: PropTypes.func,
//   onItemClick: PropTypes.func,
//   onExpandIcons: PropTypes.bool
// }
FontAwesome.propTypes = {
  name: PropTypes.any.isRequired,
  size: PropTypes.string,
  color: PropTypes.string
}
DashboardModuleCardHeader.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any
}
RowWithLeftMenu.propTypes = {
  leftMenuVisible: PropTypes.bool,
  leftMenuOpen: PropTypes.bool,
  children: PropTypes.array || PropTypes.any,
}
