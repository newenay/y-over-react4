import { createStore/* , applyMiddleware, compose */ } from 'redux'
//import createHistory from 'history/createBrowserHistory'
//import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers/index' // Or wherever you keep your reducers

import slideBullets from './data/m1l1_nar'
import slideInfo from './data/m1l1_info'
import examQuestions from './data/m1l1_exam'
/* import lessonSwap from './data/course_info' */

//Also change currentLesson below to correct Lessons:id

// App State
const slideControls = {

  debug: false, 
  currentLesson: 0,
  locked: true, // for icon to show, debug must be true
  play: true, // Play Btn - default position unpaused
  audioStream: false,
  audioEnd: false,
  timeSync: NaN, // default position unpaused
  singleton: false, //loads bookmark or first slide
  lessons: [
    {
      id: 0,
      path: 'm1l1',
      name: "German Expressionism",
      currentSlide: 0,
      bookmark: 0,
      completed: false
    },
    {
      id: 1,
      path: 'm2l1',
      name: "Abstract Expressionism",
      currentSlide: 0,
      bookmark: 0,
      completed: false
    },
  ]
}

const defaultState = {
  slideInfo,
  slideBullets,
  examQuestions,
  slideControls
}

// Create a history of your choosing (we're using a browser history in this case)
//const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
//const middleware = routerMiddleware(history)
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, defaultState/* , composeEnhancers(applyMiddleware(middleware)) */)

//export {history}
export default store
