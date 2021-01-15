import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'


export const AccountSectionContext = createContext();

export class AccountSectionContextProvider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeAccountScreen: 'users' ///enum: ['users', 'settings', 'rx'...]
    }
  }

  goToAccountSection(activeAccountScreen) {
    if(!activeAccountScreen) return;

    this.setState({
      activeAccountScreen
    })
  }


  render () {
    return (
      <AccountSectionContext.Provider value={{...this.state, goToAccountSection: this.goToAccountSection.bind(this)}}>
        {this.props.children}
      </AccountSectionContext.Provider>
    )//END return
  }//END render
}///END <Provider />
