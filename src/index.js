import "@babel/polyfill";
import './assets/less/main.less';
import '../node_modules/font-awesome/fonts/fontawesome-webfont.ttf';

import $ from 'jquery';
import axios from 'axios';
import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Router, Redirect, Switch, Route, HashRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
// import { Auth0Provider } from "./react-auth0-spa";
// import reactS3 from 'react-s3';
// import MembersApp from './App.members.jsx';
// import config from './auth_config.json';

// import 'noti5';
import App from './App.jsx';

import rootReducer from './store/reducers/';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const history = createBrowserHistory();
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const $existingThemeColor = (document.body.hasAttributes && document.body.getAttributeNames()) || 'dark'

///SET AXIOS CUSTOM HEADERS
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';


///// MAIN APP COMPONENT
class IndexRouter extends React.Component{

  state={
    curPath: '/',
    themeColor: _.first($existingThemeColor),
    leftMenuVisible: false
  };


  UNSAFE_componentDidMount(){
    ///set default layout theme to white
    (!document.body.hasAttributes()) && document.body.setAttribute('white','')

    console.log("___ <membersApp />, componentDidMount() executed");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("___ <IndexRouter /> @index.js, componentDidUpdate() executed");
  }


   // MY METHODS
  leftMenuToggle(){
    try {
      this.setState({
        leftMenuVisible: !this.state.leftMenuVisible
      }, () => console.log(`on: ${this.state.leftMenuVisible}`))
    } catch (err) {
      console.log(`leftmenuv__webpack_hmisible state not setting, err: ${err}`);
    }
  }


  /** what is goin on */
  render(){

    //pass authCheck as prop for login validation to children
    const Auth = {isAuthenticated: () => false};
    const leftMenuToggle = this.leftMenuToggle.bind(this)
    const propsToPass = { leftMenuToggle, ...this.state}

    return(
      <Router basename="/" {...{history}}>

        <Switch>

          {/*<Route path="/callback" render={() => <App {...{location}} {...propsToPass} {...this.state} />} />*/}

          <Route path="/logout" exact render={
            () => {return(<H3>logged out successfully</H3>)}
          } />

          <Route path="*" render={
            () => (<App {...{Auth}} {...this.state} {...propsToPass} />)
          } />

        </Switch>

      </Router>
    )
  }
}///END <IndexRouter />


ReactDOM.render(
    <Provider store={store}>
      <IndexRouter />
    </Provider>,
    document.querySelector('#main')
);

if (module.hot) {
  module.hot.accept(() => {

    // require('./assets/less/main.less')
    const MainAppUpdated = IndexRouter

    ReactDOM.render(
        <Provider store={store}>
          <MainAppUpdated />
        </Provider>,
        document.querySelector('#main')
    );
  })
}

serviceWorker.unregister();

///provider allows entire app to be aware of redux properties
{/*
  const Auth = new auth()
  const onRedirectCallback = appState => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : `${window.location.pathname}`
    );
  };
  handleAuthenticationHandler({ hash }){
    if(hash){
      Auth.handleAuthentication()
    }
  }

  ReactDOM.render(
  <Provider
    store={store}
  >
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={config.redirectUri}
      {...{onRedirectCallback}}
    >
      <IndexRouter />
    </Auth0Provider>
  </Provider>,
  document.querySelector('#main')
);
*/}


/*
  ///// MEMBERS APP COMPONENT
    // class Members extends React.Component{
    //
    //   authCheck(){
    //     //validate login...
    //   }
    //
    //   componentDidMount(){
    //     console.log("members comp mounted")
    //   }
    //
    //   render(){
    //
    //     //pass authCheck as prop for login validation to children
    //     return(
    //       <HashRouter basename="/">
    //          <HashRouter basename="/brndnlnk4/murdockemr/">
    //         <MembersApp />
    //       </HashRouter>
    //     )
    //   }
  // }///END <Member />


  //// SWITCH COMPONENTS BY AUTH/GUEST /////
    // switch(window.location.pathname){
    // 	case "/member":
    //   ReactDOM.render(<MainApp />, document.querySelector('#main'));
    //   // ReactDOM.render(<Members />, document.querySelector('#main'));
    // 		break;
    // 	default:
    //   ReactDOM.render(<h2>ok</h2>, document.querySelector('#main'));
    // 		break;
  // }


  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA

    // react-powerplug tips:
    //
    // <State initial={{ offset: 0, limit: 10, totalCount: 200 }}>
    // 	{({ state, setState }) => (
    // 		<Pagination {...state} onChange={(offset) => setState({ offset })} />
    // 	)}
    // </State>
    //
    //
    // <Toggle initial={false} render={({ on, toggle }) => (
    // 	<Button onClick={toggle}>
    // 		{ (on) ? 'toggle on' : 'toggle off' }
    // 	</Button>
    // )} />
    //
    // <Toggle initial={false}>
    // 	{({ on, toggle }) => (
    // 		<Button onClick={toggle}>
    // 			{ (on) ? 'toggle on' : 'toggle off' }
    // 		</Button>
    // </Toggle>
    //
    //
    //  <Route
    //    render={({ match, history, location }) => this.authCheck() ? (
    //   <Switch>
    //
    //     <Route path="/" exact component={HomeComponent} />
    //     <Route path="/patients" component={PatientsComponent} />
    //     <Route path="/dashboard" component={DashboardComponent} />
    //
    //   </Switch>
    // ) />
*/
