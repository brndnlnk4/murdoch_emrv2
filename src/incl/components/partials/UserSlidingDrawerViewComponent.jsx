import React, { Component, useContext, Fragment, PureComponent } from 'react'
import AvatarEditor from 'react-avatar-editor'
import ReactDrawer from 'react-drawer';
import PropTypes from 'prop-types'
import Img from 'react-image'
import { BrowserRouter as Router, withRouter, Redirect, Link, Route, Switch } from 'react-router-dom';
import { Row, Form, Input, Label, Card, CardBody,
  CardHeader, CardFooter, Container, Col, Panel,
  Button, Badge, ButtonGroup, Carousel, CarouselItem,
  CarouselControl, DropdownToggle, DropdownMenu, DropdownItem,
  Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem,
  CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup,
  FormText, InputGroup, InputGroupAddon, Modal, ModalHeader,
  ModalBody, ModalFooter, Popover, PopoverHeader, PopoverBody,
  ListGroup, ListGroupItem, CardImg, CardText, CardTitle, CardSubtitle,
  CardLink, CardColumns, CardGroup, Collapse, UncontrolledDropdown,
} from 'reactstrap';



export default class UserSlidingDrawerViewComponent extends PureComponent {
  state = {
    profileImgSrc: './assets/img/BrandonModelpic.jpg'
  }

  editProfileImg = this.editProfileImg.bind(this)


  componentDidMount() {
    const $rightSideDrawerContainer = $("#user-right-side-drawer-ul-container");

    $rightSideDrawerContainer.children().last().accordion({
      header: 'li.list-header',
    })
  }

  editProfileImg() {
    if(this.state.profileImgSrc) {
      let modalViewContent = (
        <AvatarEditor
          ref={(img) => this.imgToEditRef = img}
          image={this.state.profileImgSrc}
          width={250}
          height={250}
          border={50}
          scale={1.2}
        />
      )
    }
    alert('----edit image modal view under-construction---');
  }

  async onClickSave() {
    if (this.imgToEditRef) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.imgToEditRef.getImage()
      //getImage() returns HTMLCanvasElement
      const imgUrl = canvas.toDataURL();
      const blob = await imgUrl.blob(); //convert to viewable urlBlobObj (URL.createObjectURL(blob))
      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = this.imgToEditRef.getImageScaledToCanvas()
    }
  }


  render () {
    return (
      <section id="user-right-side-drawer-section-container">

        <ReactDrawer

          open={this.props.open}
          position={this.props.position}
          onClose={this.props.onDrawerClose}
          noOverlay={this.props.noOverlay}
        >
          <ListGroup flush id="user-right-side-drawer-ul-container">

            {/* *************** MY PANEL *************** */}
            <ListGroupItem color="dark" className="d-flex">
              <h5 className="w-100">
                <FontAwesome name="universal-access" /> My Panel
                <Button type="button" size="sm" color="muted" className="pull-right" onClick={this.props.toggleDrawer}>
                  <FontAwesome name="close" />
                </Button><br/>
              </h5>
            </ListGroupItem>

            <ListGroupItem className="d-flex" id="avatarSection">
              <CardBody>
                <CardLink alt="Avatar" tag="button" className="btn" onClick={this.editProfileImg}>

                  <Img
                    src={[this.state.profileImgSrc]}
                    className="img-thumbnail rounded-circle"
                  />

                </CardLink>
                <CardTitle className="text-center">Welcome Back Bob!</CardTitle>
                <CardSubtitle className="text-center">Medical Assisstant</CardSubtitle>
              </CardBody>
            </ListGroupItem>

            <ListGroupItem>
              {/* *************** QUICK SETTINGS *************** */}
              <ListGroup id="settingsSection">
                <ListGroupItem className="noti-title list-header">
                  <h5 className="pull-left">Quick Settings</h5>
                </ListGroupItem>

                <ListGroupItem>
                  <Form>
                    <FormGroup className="pl-3" check>
                      <Input type="checkbox" name="settings_1" id="settings_1" />
                      <Label check for="settings_1">My Settings_1</Label>
                    </FormGroup>
                    <FormGroup className="pl-3" check>
                      <Input type="checkbox" name="settings_2" id="settings_2" />
                      <Label check for="settings_2">My Settings_2</Label>
                    </FormGroup>
                    <FormGroup className="pl-3" check>
                      <Input type="checkbox" name="settings_3" id="settings_3" />
                      <Label check for="settings_3">My Settings_3</Label>
                    </FormGroup>
                    <FormGroup className="pl-3" check>
                      <Input type="checkbox" name="settings_4" id="settings_4" />
                      <Label check for="settings_4">My Settings_4</Label>
                    </FormGroup>
                  </Form>
                </ListGroupItem>
              </ListGroup>

              {/* *************** RECENT MESSAGES *************** */}
              <ListGroup id="messagesSection">
                <ListGroupItem className="noti-title list-header">
                  <h5 className="pull-left">Recent Messages</h5>
                  <Badge color="success" className="pull-left" pill>7</Badge>
                </ListGroupItem>

                <ListGroupItem className="p-lg-2">
                  {
                    [...'Lorem ipsum'].map((item, ind) => (
                      <Card key={ind+item} className="flex-row align-items-center mt-1 mb-1 p-1">

                        <Img
                          src={['./assets/img/anonmask.jpg']}
                          className="img-fluid rounded-circle w-25"
                        />

                        <CardText className="text-justified pl-1">
                          <CardSubtitle className="text-muted">bodf sdfsa <small className="pull-right">8pm</small></CardSubtitle>
                          {item} Lorem ipsum dolor sit amet.
                        </CardText>
                      </Card>
                    ))
                  }
                </ListGroupItem>
              </ListGroup>
            </ListGroupItem>
          </ListGroup>

        </ReactDrawer>

      </section>
    )///END return
  }///END render
}///END class
