import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react'
import ReactDOM from "react-dom";

// css
import 'bootstrap/dist/css/bootstrap.min.css'; //main menu styles
import './index.css'

import App from './components/App'
import {Route, HashRouter} from 'react-router-dom'

import { Provider } from 'react-redux'
import store/* , {history} */ from './store'
/* import { ConnectedRouter } from 'react-router-redux' */

//https://stackoverflow.com/questions/37550560/why-is-react-webpack-production-build-showing-blank-page

// https://github.com/brillout/awesome-react-components - awesome list of every React element under the sun
// https://devarchy.com/react

const AppRef = React.createRef();

//also history.listenBefore( (location, done) => doSomething(location).then(done) )

/* history.listen(location => {
  //document.getElementById('stageContainer').innerHTML = resetSlideCues(); //.call
  //console.log('AppRef', AppRef);
  console.log(window.location.href, window.location.pathname)
})

/* const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
} */

ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename='/' /* history={history}  getUserConfirmation={getConfirmation}*/ >
      <Route ref={AppRef} component={App} />
    </HashRouter>
  </Provider>
  , document.getElementById('root'))
