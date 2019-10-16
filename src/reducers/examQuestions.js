// a reducer is in charge of two things:

// 1. executing the action (what's happening)
// 2. Returning the current state (copy of current state [time-travel])

function examQuestions(state = [], action) {
    /* Evaluates the action, ie: LOAD_SLIDE, SLIDE_FORWARD */
    if(typeof action.questionId !== 'undefined') {
        return {
            // take the current state
            ...state,
            // overwrite this post with a new one
            [action.questionId]: examActions(state[action.questionId], action)
        }
    }
    // And returns the state (data, not component)
    return state;
}

// See Redux Arthur notes on Reducer Composition
function examActions(state = [], action){
    /* console.log("slideBullets - Reducer:", action.type) */
    switch(action.type) {
        case 'NEXT_EXAM':
            // return the new state with the new comment
            return [...state, {
                /* user: action.cue,
                text: action.bullet */
            }];
        case 'NEXT_QUESTION':
            console.log("Removing a comment");
            // return the new state without the deleted comment
            return [
                //from the start to the one we want to delete
                ...state.slice(0,action.i),
                // after the deleted one, to the end
                ...state.slice(action.i + 1)
            ]
        default:
            return state;
    }
}

export default examQuestions;