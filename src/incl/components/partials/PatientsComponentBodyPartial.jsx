import React, { PureComponent, Fragment, Component } from 'react'
import Img from 'react-image';
import moment from 'moment'
import _ from 'lodash';
import { Toggle } from 'react-powerplug';
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
} from '../../../scripts';


const tree = [
  {
    text: 'Furniture', expanded: true, items: [
      { text: 'Tables & Chairs' }, { text: 'Sofas' }, { text: 'Occasional Furniture' }]
  },
  {
    text: 'Decor', items: [
      { text: 'Bed Linen' }, { text: 'Curtains & Blinds' }, { text: 'Carpets' }
    ]
  }
]

const PatientComponentActiveRecentViewMapped = (props) => {
  //LIST OF PATIENTS MAPPED
  const MappedPatientData = ({ toggle }) => !_.isEmpty(props.patientsData) ? _.map(props.patientsData, (data, i) => {
    let { first_name='', last_name='', birthday='', gender } = window.data = data;
    let genderIcon = (_.lowerCase(gender) === 'm') ? 'male' : 'female'
    let bday = birthday && moment(birthday);
    let age = bday.fromNow(true) || 'n/a';
    let ptId = _.trim(data.id) ? data.id : ''

    return (
      <tr data-ptid={ptId} onClick={() => {toggle(); $("[data-pt]").data("pt", ptId)}}>
        <th title={i+1}>
          <Img
            width={`40px`}
            className={`rounded`}
            src="assets/img/anonmask.jpg"
            loader={<FontAwesome name="spinner fa-pulse" />}
          />
        </th>
        <td className="text-capitalize">{`${first_name} ${last_name.charAt(1)}.`}</td>
        <td>{`${bday ? bday.format('MM-DD-y') : ''}`}</td>
        <td>{age} old</td>
        <td><FontAwesome name={`${genderIcon}`} color="link" /></td>
      </tr>
    );///END return
  }) : ['NO PATIENT DATA'];

  return (
    <Toggle initial={false} render={({on, toggle}) => (
      <Table striped hover id="recentPatientsTableElm">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Name</th>
            <th>DoB</th>
            <th>Age</th>
            <th title="gender"><FontAwesome name="genderless" /></th>
          </tr>
        </thead>

        <tbody>
          <MappedPatientData {...{toggle}} />
        </tbody>

        <ModalViewContent {...{toggle}} on={on} backdrop={true} modalTitle='title' modalSubTitle="Patient Data">
          <Row data-pt>
            <Col md="12">
              <ListGroup>
                <ListGroupItemHeading>{`patient info`}</ListGroupItemHeading>
                <ListGroupItem>testicles__01</ListGroupItem>
                <ListGroupItem>testicles__02</ListGroupItem>
                <ListGroupItem>testicles__03</ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </ModalViewContent>

      </Table>
    )} />
  );
};


export default class PatientsComponentBodySection extends Component {

  bodySectionContent = this.bodySectionContent.bind(this)


  PreviewOfSelectedDataContent() {
    const { selectedTreeviewData } = this.props;

    return(!_.isEmpty(selectedTreeviewData) ? (
      <ListGroup>
        {
          Object.keys(selectedTreeviewData).map((itemKey, itemInd) => (
            itemKey === 'text'
          ) ? (
            <ListGroupItem key={itemInd} color="primary">
              {
                parseAndDisplayItemByType(selectedTreeviewData[itemKey])
              }
            </ListGroupItem>
          ) : (
            <ListGroupItem key={itemInd} color="secondary" size="lg">
              {
                `${itemKey}: ${JSON.stringify(this.props.selectedTreeviewData[itemKey])}`
              }
            </ListGroupItem>
          )).sort((itemA, itemB) => (itemA.props.color === 'primary' && -1)) //itemA > itemB: return -1
        }
      </ListGroup>
      ) : ('')
    )///END return
  }//END fn

  leftFileTreeDataSideMenu() {
    const dirOrFileCheck=this.props.selectedTreeviewData.hasOwnProperty('items')

    return(  InputGroup, InputGroupText, InputGroupAddon, Modal, ModalHeader, ModalBody,

      <ButtonGroup vertical>

        <UncontrolledDropdown direction="right" title="select something" tag="span" className="p-0 btn btn-secondary">
          <DropdownToggle color="primary" className=" btn-lg btn-secondary">
            <FontAwesome name="bars" color="link" />
          </DropdownToggle>

          <DropdownMenu>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disabled>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <Button size={'lg'} color={'secondary'} disabled={dirOrFileCheck === true}>
          <FontAwesome name="ambulance" color='link' />
        </Button>
        <Button size={'lg'} color={'secondary'} disabled={dirOrFileCheck === true}>
          <FontAwesome name="home" color='link' />
        </Button>
        <Button size={'lg'} color={'secondary'} disabled={dirOrFileCheck === true}>
          <FontAwesome name="user" color='link' />
        </Button>
        <Button size={'lg'} color={'secondary'} disabled={dirOrFileCheck === true}>
          <FontAwesome name="medkit" color='link' />
        </Button>
        <Button size={'lg'} color={'secondary'} disabled={dirOrFileCheck === true}>
          <FontAwesome name="heartbeat" color='link' />
        </Button>
        <Button size={'lg'} color={'secondary'} disabled={dirOrFileCheck === true}>
          <FontAwesome name="hospital-o" color='link' />
        </Button>

      </ButtonGroup>
    )
  }

  fadeMe(props) {
   return props ? (
     <Fade
       in={!_.isEmpty(this.props.selectedTreeviewData)}
       onEnter={ props => {''}}
       onEntering={ children => {''}}
     >
       {props}
     </Fade>) : ''
  }

  bodySectionContent({ screenActiveTab }) {

    switch (screenActiveTab) {
      case 1:
      return(
        <Fragment>
          <Col xs='2' className="text-right">

            {/**** LEFT SIDE TREEVIEW MENU  ****/}
            {this.fadeMe.call(this, this.leftFileTreeDataSideMenu())}

          </Col>
          <Col xs="10" lg="10">

            {this.fadeMe.call(this, this.PreviewOfSelectedDataContent())}

          </Col>
        </Fragment>
      )
      default:
        const listOfActivePatientsContainer = (amtPerRow=3, maxRowCountPerPg=4, data) => {

          const ptArrChunks = _.chunk(data, amtPerRow);
          const { patientsData } = this.props;

          return (
            <Fragment>

              <PatientComponentActiveRecentViewMapped {...{patientsData}} />

              {/*{
                _.map(ptArrChunks, (chunk, chunkInd) => (

                  <Row key={`row-${chunkInd}`}>
                    {  bodySectionContent({ screenActiveTab }) {

                      _.map(chunk, ({ id, first_name, last_name, birthday }, ptInd) => (
                        <Col
                          sm={4}
                          key={`col-${chunkInd}-${ptInd}`}
                          className="p-md-1 btn btn-light"
                          onClick={e => {e.preventDefault(); this.changePatientInfoViewScreenHandler(1, id)}}
                        >
                          <Media className="border">
                            <Media body>
                              <Media heading className="text-capitalize" tag="h6">
                                <FontAwesome name='asterisk'></FontAwesome>{first_name} {last_name.charAt(0)}
                              </Media>
                              <small className="text-muted text-left">
                                <b>Rx:</b> Xanax 20mg
                              </small>
                            </Media>
                          </Media>
                        </Col>
                      ))///END map
                    }
                  </Row>
                ))///END map
              }*/}

                <PaginatedFooterSection
                  currentActivePg={this.props.patientInfoViewPaginationPage}
                  totalItemCount={this.props.totalRows}
                  onClick={this.goToPaginatedPage}
                  maxRowCountPerPg={3}
                  amtPerRow={3}
                />            {/**** PATIENT-MAIN-TREEVIEW  ****/}
            {/*<MyTreeView
              data={_.isEmpty(this.props.getPatientsTreeviewData) ? tree : this.props.getPatientsTreeviewData}
              animate={true}
              expandIcons={true}{}
              aria-multiselectable=  bodySectionContent({ screenActiveTab }) {
              {false}
              size={{md:{size: 'auto', offset: 0}}}
              onItemClick={this.onItemExpanded.bind(this)}
              onExpandChange={this.onItemExpanded.bind(this)}
              itemRender={props => (<Fragment><FontAwesome name='home' />{props.item.text}</Fragment>)}
            />*/}

              </Fragment>
            )///END return;
      };////END listOfActivePatientsC  bodySectionContent({ screenActiveTab }) {

      return(
        <Col xl={{size: 10, offset: 1}} sm={{size: 12}}>

          {this.fadeMe.call(this, this.PreviewOfSelectedDataContent())}

          <Card>

            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardText>Patients in the last 10 days</CardText>
            </CardHeader>

            <CardBody>
              <ListGroup>
                {/**** PATIENT-MAIN-TREEVIEW  ****/}
            {/*<MyTreeView
              data={_.isEmpty(this.props.getPatientsTreeviewData) ? tree : this.props.getPatientsTreeviewData}
              animate={true}
              expandIcons={true}{}
              aria-multiselectable=  bodySectionContent({ screenActiveTab }) {
              {false}
              size={{md:{size: 'auto', offset: 0}}}
              onItemClick={this.onItemExpanded.bind(this)}
              onExpandChange={this.onItemExpanded.bind(this)}
              itemRender={props => (<Fragment><FontAwesome name='home' />{props.item.text}</Fragment>)}
            />*/}
                <ListGroupItem>

                  {listOfActivePatientsContainer(3,null, this.props.patientsData)}
                  
                </ListGroupItem>
              </ListGroup>
            </CardBody>

          </Card>
        </Col>
      )//END return
    }//END switch
  }


  render () {
    return (
      <this.bodySectionContent />
    )
  }
}


            {/**** PATIENT-MAIN-TREEVIEW  ****/}
            {/*<MyTreeView
              data={_.isEmpty(this.props.getPatientsTreeviewData) ? tree : this.props.getPatientsTreeviewData}
              animate={true}
              expandIcons={true}{}
              aria-multiselectable=  bodySectionContent({ screenActiveTab }) {
              {false}
              size={{md:{size: 'auto', offset: 0}}}
              onItemClick={this.onItemExpanded.bind(this)}
              onExpandChange={this.onItemExpanded.bind(this)}
              itemRender={props => (<Fragment><FontAwesome name='home' />{props.item.text}</Fragment>)}
            />*/}
