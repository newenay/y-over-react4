// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of current state (best to keep PURE)

// (previousState, action) => newState

function slideInfo(state = [], action) {
    /* console.log("m1l1_info - Reducer:", action.type) */
    const i = action.slideId;
    switch(action.type) {
        case 'INCREMENT_CUES' :
            // console.log("Reducer-->", action);
            return [
                ...state.slice(0,i), //before the one we are updating
                {...state[i], cuePoint: state[i].cuePoint + 1},
                ...state.slice(i + 1), //after the one we are updating   
            ];
        case 'REWIND_SLIDE':
            return [
                ...state.slice(0,i), //before the one we are updating
                {...state[i], cuePoint: state[i].cuePoint = 0},
                ...state.slice(i + 1), //after the one we are updating
            ]

        default:
            return state;
    }
}

export default slideInfo;