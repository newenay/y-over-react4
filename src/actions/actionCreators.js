// 1.) PROPS THAT DISPATCH EVENTS WITH PROPERTIES TO UPDATE THE STATE
// 2.) NEXT STOP IS THE REDUCER

// ************* REDUCER - slideInfo ******************
export function increment(slideId){
    return {
        type: 'INCREMENT_CUES',
        slideId
    }
}

export function rewind(slideId){
    return {
        type: 'REWIND_SLIDE',
        slideId
    }
}

// ************* REDUCER - slideControls ******************
export function changeLesson(lessonId){
    return { 
        type: 'CHANGE_LESSON', 
        lessonId
    }
}

export function completeLesson(lessonId, completed){
    return { 
        type: 'LESSON_COMPLETE', 
        lessonId,
        completed
    }
}

export function loadSlide(lessonId, currentSlide, bookmark){
    return { 
        type: 'LOAD_SLIDE',
        lessonId,
        currentSlide,
        bookmark
    }
}

export function dataLoaded(singleton){
    return {
        type: 'DATA_LOADED',
        singleton
    }
}

export function toggleLock(locked){
    return { 
        type: 'LOCK_UNLOCK',
        locked
    }
}

export function togglePlayPause(play){
    return { 
        type: 'PLAY_PAUSE',
        play
    }
}

export function audioEvents(audioStream, audioEnd){
    return { 
        type: 'AUDIO_EVENTS',
        audioStream, 
        audioEnd
    }
}

// ************* REDUCER - slideBullets ******************
export function addBullet(slideId, cue, bullet){
    return {
        type: 'ADD_COMMENT',
        slideId,
        cue,
        bullet
    }
}

// remove comment
export function removeBullet(slideId, i){
    return {
        type: 'REMOVE_COMMENT',
        slideId, 
        i 
    }
}

// ************* REDUCER - examQuestions ******************
export function examActions(questionId){
    /*return 'NEXT_EXAM',
        questionId,
         cue,
        bullet 
    }*/
}