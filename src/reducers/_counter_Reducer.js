//Slide Control Reducer take two args state and action
export default function info_reducer(state, action) {
    if (state === undefined) {
        return { count: 0 };
    }

    var count = state.count;

    //action
    switch (action.type) {
        case "increaseSlide":
            return { count: count + 1 };
        case "decreaseSlide":
            return { count: count - 1 };
        default:
            return state;

    }
}

/*
bookmarking -- > medium.com/front-end-hacking/code-splitting-redux-reducers-4073db30c72e\

import {createStore, combineReducers} from 'redux';

const rootReducerInitialState = {
    lesson: 1,
    slide: 1
}

const counter = (state = rootReducerInitialState, action) => {
    switch (action.type) {
        //case 'increaseLesson': return {...state, lesson: state.lesson +1};
        //case 'decreaseLesson': return {...state, lesson: state.lesson -1};
        case 'increaseSlide': return {...state, slide: state.slide +1};
        case 'decreaseSlide': return {...state, slide: state.slide -1};
    }
    return state;
}

const store = createStore(combineReducers({app: counter}));
*/