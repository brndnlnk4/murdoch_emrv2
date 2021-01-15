import React, { Component } from 'react';

import * as ACTIONS from '../store/actions/actions';

import { connect } from 'react-redux'; ///connects react container with redux store


class Container1 extends Component {

  // !remember: redux handles state for us & passes props to components

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.stateProp1 != this.props.stateProp1) console.log(`---received new prop: this.props.stateProp1: %o / nextProps.stateProps1: %o`, this.props.stateProp1, nextProps.stateProp1);
  }

  render() {
    return (
      <div>
        <h3> redux state and actions:</h3>

        <button onClick={() => console.log(`state: %o \n userInput: %o`, this.props.stateProp1, this.props.userInput1)}>get State</button>

        <button onClick={this.props.action1}>dispatch action 1 then get state</button>
        <button onClick={this.props.action2}>dispatch action 2 then get state</button>
        <button onClick={() => this.props.action_creater1()}>dispatch action creator 1</button>
        <button onClick={() => this.props.action_creater2()}>dispatch action creator 2</button>
        <button onClick={() => this.props.action_creater3('testicles')}>dispatch action creator 3</button>
      </div>
    );
  }
}///END container1

///returns state from redux AS a 'stateProp' or whatever the user defines key as ()
function mapStateToProps(state){
  return{
    userInput1: state.userReducer1.userInput,
    stateProp1: state.reducer1.stateProp1 //return redux's state value as a prop for container
  };
}

///returns {key=>val (val = dispatchFn())} && changes state with execution of dispatching actions
function mapDispatchToProps(dispatch){
  return{
    action1: () => dispatch(ACTIONS.SUCCESS), //action1 => dispatchFn()
    action2: () => dispatch(ACTIONS.FAILURE), //action2 => dispatchFn()
    action_creater1: () => dispatch(ACTIONS.success()), //action creators
    action_creater2: () => dispatch(ACTIONS.failure()), //action creators
    action_creater3: (text) => dispatch(ACTIONS.user_input(text)), //action creators
  };
}

///----- connect redux props and state... to Container: ------
///REMEMBER: connect(mapStateToProps, mapDispatchToProps)(container): read & actions container (2 args)
///REMEMBER: connect(null, mapDispatchToProps)(container): dispatch actions only container (1 arg)
///REMEMBER: connect(mapStateToProps)(container): read only container (1 arg)
  export default connect(mapStateToProps, mapDispatchToProps)(Container1);
