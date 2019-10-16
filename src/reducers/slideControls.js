
// https://redux.js.org/recipes/structuring-reducers/refactoring-reducer-example#extracting-case-reducers
function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues)
}

function updateItemInArray(array, itemId, updateItemCallback) {
    const updatedItems = array.map(item => {
        if(item.id !== itemId) {
            // Since we only want to update on item, preserve all others as they are
            return item
        }
        // Use the provided callback to create an updated item
        const updatedItem = updateItemCallback(item)
        return updatedItem
    })

    return updatedItems
}

function slideControls(state = 0, action) {
    switch (action.type) {
        
        // *********** 1st level state change ***********
        case 'CHANGE_LESSON': {
            // action.whatEver is passed action parameter
            return updateObject(state, { currentLesson: action.lessonId }) 
        }

        case 'LOCK_UNLOCK': {
            // action.whatEver is passed action parameter
            return updateObject(state, { locked: action.locked }) 
        }

        case 'DATA_LOADED': {
            // action.whatEver is passed action parameter
            return updateObject(state, { singleton: action.singleton }) 
        }

        case 'PLAY_PAUSE': {
            // action.whatEver is passed action parameter
            return updateObject(state, { play: action.play }) 
        }

        case 'AUDIO_EVENTS': {
            // action.whatEver is passed action parameter
            return updateObject(state, { audioStream: action.audioStream, audioEnd: action.audioEnd }) 
        }

        // *********** 2nd level state change ***********
        case 'LESSON_COMPLETE': {
            const whatChanged = updateItemInArray(state.lessons, action.lessonId, foo => {
                return updateObject(foo, { completed: action.completed })
            })
            return updateObject(state, { lessons: whatChanged })
        }

        case 'LOAD_SLIDE': {
            const whatChanged = updateItemInArray(state.lessons, action.lessonId, foo => {
                return updateObject(foo, { currentSlide: action.currentSlide, bookmark: action.bookmark })
            })
            // console.log('LOAD', action.lessonId, action.slideId)
            return updateObject(state, { lessons: whatChanged })
        }

        default:
            return state
    }
  }

export default slideControls;