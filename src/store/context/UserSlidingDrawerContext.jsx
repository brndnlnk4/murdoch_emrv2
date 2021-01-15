import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'


export const UserSlidingDrawerContext = createContext();

export class UserSlidingDrawerSectionContextProvider extends Component {

  state = {
    open: false,
    position: 'right',
    noOverlay: false,
  }

  toggleDrawer = this.toggleDrawer.bind(this);
  closeDrawer = this.closeDrawer.bind(this);
  onDrawerClose = this.onDrawerClose.bind(this);
  setPosition = this.setPosition.bind(this);
  setNoOverlay = this.setNoOverlay.bind(this);


  setPosition(e) {
    this.setState({position: e.target.value});
  }
  setNoOverlay(e) {
    this.setState({noOverlay: e.target.checked});
  }
  toggleDrawer() {
    this.setState({open: !this.state.open});
  }
  closeDrawer() {
    this.setState({open: false});
  }
  onDrawerClose() {
    this.setState({open: false});
  }


  render () {
    return (
      <UserSlidingDrawerContext.Provider value={{
        ...this.state,
        toggleDrawer: this.toggleDrawer,
        closeDrawer: this.closeDrawer,
        onDrawerClose: this.onDrawerClose,
        setPosition: this.setPosition
      }}>
        {this.props.children}
      </UserSlidingDrawerContext.Provider>
    )//END return
  }//END render
}///END <Provider />
