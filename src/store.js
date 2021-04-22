import { createStore/* , applyMiddleware, compose */ } from 'redux'
//import createHistory from 'history/createBrowserHistory'
//import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers/index' // Or wherever you keep your reducers

import slideBullets from './data/m10l1_nar'
import slideInfo from './data/m10l1_info'
import examQuestions from './data/m10l1_exam'
/* import lessonSwap from './data/course_info' */

//Also change currentLesson below to correct Lessons:id

// App State
const slideControls = {

  debug: true, // turns on debugger and console traces (*also lesson menu - not active, but will switch lesson[])
  currentLesson: 9, // determines with lesson in lessons[] array (below)
  locked: false, // unlock course Nav -- for icon to show, debug must be true
  
  play: true, // Play Btn - default position unpaused
  audioStream: false, // Is audio playing
  audioEnd: false, // Is audio complete
  timeSync: NaN, // default position unpaused
  singleton: false, //loads bookmark or first slide
  lessons: [
    {
      id: 0,
      path: 'm1l1',
      name: "Personnel Recovery",
      currentSlide: 0,
      bookmark: 0,
      completed: false
    },
    {
      id: 1,
      path: 'm2l1',
      name: "Joint Operations",
      currentSlide: 0,
      bookmark: 0,
      completed: false
    },
    {
      id: 2,
      path: 'm3l1',
      name: "Command & Control",
      currentSlide: 0,
      bookmark: 0,
      completed: false
    },
    {
      id: 3,
      path: 'm4l1',
      name: "Intel Support to PR",
      currentSlide: 0,
      bookmark: 0,
      completed: false
    },
    {
      id: 4,
      path: 'm5l1',
      name: "Reintegration Fundamentals",
      currentSlide: 0,
      bookmark: 0,
      completed: false
    },
    {
      id: 5,
      path: 'm6l1',
      name: "Reintegration Process",
      currentSlide: 0,
      bookmark: 0,
      completed: false
    },
    {
      id: 6,
      path: 'm7l1',
      name: "Family Support",
      currentSlide: 0,
      bookmark: 0,
      completed: false
    },
    {
      id: 7,
      path: 'm8l1',
      name: "The US Diplomatic Environment",
      currentSlide: 0,
      bookmark: 0,
      completed: false
    },
    {
      id: 8,
      path: 'm9l1',
      name: "PR Coord & Collaboration Relationships",
      currentSlide: 0,
      bookmark: 0,
      completed: false
    },
    {
      id: 9,
      path: 'm10l1',
      name: "PR Coord & Collaboration Processes",
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
