import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

//Reducer must have the name as its export, and possibly the same name as the data it lines up with
import slideBullets from './slideBullets';
import slideInfo from './slideInfo';
import examQuestions from './examQuestions' // this reducer is not functional
import slideControls from './slideControls';

// Combine all reducers together
const rootReducer = combineReducers({ slideInfo, slideBullets, examQuestions, slideControls, routing }); 

export default rootReducer;