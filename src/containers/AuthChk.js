import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom'

import * as ACTIONS from '../store/actions/actions';
import { connect } from 'react-redux'; ///connects react container with redux store


const refreshPage = (pageToLoad='/') => {
  setTimeout(() => {history.replace(pageToLoad)}, 200)
}


class AuthCheck extends Component {

  async componentDidMount() {
    const Auth = this.Auth = await this.props.Auth

    refreshPage('dashboard')

    if(Auth.isAuthenticated()) {
    } else {
      this.props.login_fail()
      if(_.trim(localStorage.token_expiration)) localStorage.clear()
      refreshPage()
  }
}


  // !remember: redux handles state for us & passes props to components
  render() {

    return this.Auth && this.Auth.isAuthenticated() ? (
      <Fragment>
        <h3>isAuthenticated: {JSON.stringify(this.Auth.isAuthenticated())}</h3>
        <button className="btn btn-info" onClick={() => {this.Auth.logout()}}>logout</button>
      </Fragment>
    ) : (
      <Fragment>
        <h3>not authenticated</h3>
        <button color="link" onClick={() => {this.Auth.login()}}>login</button>
      </Fragment>
    )
  }
}///END container1


///returns state from redux AS a 'stateProp' or whatever the user defines key as ()
function mapStateToProps(state){
  return{
    //!!!!!!!!!!CREATE REDUCER FOR HANDLING REDUC'S AUTH-TOKEN 'STATE' AND MAP HERE
    isAuthenticated: state.authReducer1.isAuthenticated,
    // userProfile: state.userReducer1.userProfile
  };
}

///returns {key=>val (val = dispatchFn())} && changes state with execution of dispatching actions
function mapDispatchToProps(dispatch){
  return{
    login_success: () => dispatch(ACTIONS.login_success()), //action creators(payload)
    login_fail: () => dispatch(ACTIONS.login_failure()), //action creators(payload)
    add_user: (userProfile) => dispatch(ACTIONS.add_user(userProfile))
  };
}

///----- connect redux props and state... to Container: ------
///REMEMBER: connect(mapStateToProps, mapDispatchToProps)(container): read & actions container (2 + 1 args)
///REMEMBER: connect(null, mapDispatchToProps)(container): dispatch actions only container (1 arg)
///REMEMBER: connect(mapStateToProps)(container): read only container (1 arg)
  export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck);
