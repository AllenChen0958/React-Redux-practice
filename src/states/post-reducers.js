const searchTextInitState = {
    searchText: '',
    inputValue: ''
};
export function searchTextInput(state = searchTextInitState, action) {
    switch(action.type){
        case '@SEARCH_TEXT/SET_SEARCH_TEXT':
            return {...state, searchText: action.searchText};
        case '@SEARCH_TEXT/SET_INPUT_VALUE':
            return {...state, inputValue: action.inputValue};
        default:
            return state;
    }
}


const initPostForm = {
    mood: 'na',
    inputFormValue: '',
    inputDanger: false,
    moodToggle: false,
};

export function postForm(state = initPostForm, action) {
    switch(action.type) {
        case '@POST_FORM/SET_MOOD':
            return {
                ...state,
                mood: action.mood
            };
        case 'POST_FORM/SET_INPUT_FORM_VALUE':
            return {
                ...state,
                inputFormValue: action.inputFormValue
            };
        case 'POST_FORM/SET_INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.inputDanger
            };
        case '@POST_FORM/TOGGLE_MOOD':
            return {
                ...state,
                moodToggle: !state.moodToggle
            };
        case '@POST_FORM/SET_MOOD_TOGGLE':
            return {
                ...state,
                moodToggle: action.mood
            }
        default:
        return state;
    }
}


const initPostState = {
    postLoading: false,
    posts: [],
};

export function post(state = initPostState, action) {
    switch (action.type) {
        case '@POST/START_LOADING':
            return {
                ...state,
                postLoading: true
            };
        case '@POST/END_LOADING':
            return {
                ...state,
                postLoading:false
            };
        case '@POST/END_LIST_POSTS':
            return {
                ...state,
                posts: action.posts
            }
        default:
            return state;

    }
}

