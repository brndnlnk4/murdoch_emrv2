import { BrowserRouter as Router, withRouter, Redirect, Link, Route, Switch } from 'react-router-dom';
import React, { Component, Fragment, PureComponent } from 'react';
import LazyLoad from 'react-lazyload-fadein';
import $ from "jquery";
import _ from "lodash";
import axios from 'axios';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Toggle } from 'react-powerplug';
import { Row, Form, Input, Label, Card, CardBody,
  CardHeader, CardFooter, Container, Col, Panel,
  Button, Badge, ButtonGroup, Carousel, CarouselItem,
  CarouselControl, DropdownToggle, DropdownMenu, DropdownItem,
  Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem,
  CarouselsCaption, CarouselIndicators, Jumbotron, FormGroup,
  FormText, InputGroup, InputGroupAddon, Modal, ModalHeader,
  ModalBody, ModalFooter, Popover, PopoverHeader, PopoverBody,
  ListGroup, ListGroupItem, CardImg, CardText, CardTitle, CardSubtitle,
  CardGroup, Collapse, UncontrolledDropdown,
} from 'reactstrap';

// import { uploadPicViaAjaxSubmit as uploadFile } from '../../scripts';

import LeftMenuComponent from '../components/LeftMenuComponent';
import DashboardModulesComponent from '../components/DashboardModulesComponent';

import { dashboardSortableModuleOptions, dashboardDraggableModuleOptions,
  leftMenuSortableNavItemsOptions, RowWithLeftMenu, LazyLoadedComponentWrapper
} from '../../scripts';
// import '../../globals';


////(EXPORT AS MODULE) encapsulated leftMenu and i3t's functionality into its own class:
export default class DashboardComponentLazyLoaderWrapper extends PureComponent {

  state = {
    upload: null,
    leftMenuDroppedComponents: [],
    dashboardSortableModuleOptions,
    dashboardDraggableModuleOptions,
    leftMenuSortableNavItemsOptions,
  }

  leftMenuNewModuleDropHandler = this.leftMenuNewModuleDropHandler.bind(this)
  lazyLoaderWrappedDashboardComponent = this.lazyLoaderWrappedDashboardComponent.bind(this)


  leftMenuNewModuleDropHandler(e) {
    console.log(`__new dashboard module dropped onto leftMenu with id: ${e.target.id}`);
  }


  //**** MY METHODS *****//
  lazyLoaderWrappedDashboardComponent(otherProps) {
    const componentsOwnProps = {
      showSearchBar: true,
      revert: true
    };

    return (
      <LazyLoadedComponentWrapper
        {...componentsOwnProps}
        {...this.props}
        {...this.leftMenuNewModuleDropHandler}
        component={(props) => (<DashboardModulesComponent {...props} {...otherProps} />)}
      />
    )///END return
  }//END lazyLoaderWrappedDashboardComponent


  render() {

    const { leftMenuVisible, onload } = this.props

    return(
      <RowWithLeftMenu>
        <LeftMenuComponent
          { ...this.state }
          { ...this.props }
        />

        <this.lazyLoaderWrappedDashboardComponent />

      </RowWithLeftMenu>
    )///END return
  }//END render
}///END App


{/*uploadFileCheck(e) {
  e.preventDefault();

  const $inputElm = document.querySelector("[name='fileUpload']");
  const input = typeof $inputElm != undefined && $($inputElm);
  const $formElm = e.target.files.length ? e.target.files[0] : (input.files || null)

  $formElm && this.setState({
    upload: $formElm
  }, async () => {
    let fileUpload = await uploadFileHandler.call(this, this.state.upload)

    console.log(`---- uploadfiledata returned: ${fileUpload}, \n ---- file: `, this.state.upload);
  })


  const uploadFileHandler = async (fileData) => {
    const $formData = new FormData()

    $formData.append('fileUpload', fileData)
    $formData.append('uploadeBy', 'brandonO')

    try {

      return await axios({
        url: '/patients/userId123',
        method: 'post',
        data: $formData,
        onUploadProgress: ({ loaded, total, type }) => {
          // get progress event object-dataz
          console.log(`___progressEvent: ${loaded} / ${total}`);
        },
        // headers: {
          // 'Content-Type': 'application/x-www-Accept-form-urlencoded',
        // }
      }).then(({ data }) => {
        console.log(`~~~~~~ file data successfully uploaded: %o ~~~~`, data);

        return data;
      }, err => err)

    } catch (err) {
      console.error(`----------error uploading file via axios: `, err);
    }
  };

  uses ajaxSubmit from scripts.js
  let $newFileUpload = new uploadFile($formElm, "/patients/file");
  let $newFileUploading = () => $newFileUpload.upload(data => String(data))
  console.log(`____new file upload: `, $newFileUploading());
}

<Form action="#" method="post" encType="multipart/form-data">
<FormGroup>
 <InputGroup>
   <Input type="file" name="fileUpload"  onChange={this.uploadFileCheck} required />
   <Input type="submit" className="btn btn-lg" value="upload"/>
 </InputGroup>
</FormGroup>
</Form>
*/}
