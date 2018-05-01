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
            };
        
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
        case '@POST/END_CREATE_POST':
            var newPosts = state.posts.slice(); 
            newPosts.unshift(action.post);
            return {
                ...state,
                posts: newPosts
            };
        case '@POST/END_CREATE_VOTE':
            var newPosts = state.posts.map(p =>{
                if (p.id === action.post.id){
                    return action.post;
                }
                return p;
            });
            return {
                ...state,
                posts: newPosts,
            };
        case '@POST/END_CREATE_COMMENT':
            var newPosts = state.posts.map(p =>{
                if (p.id === action.post.id){
                    return action.post;
                }
                return p;
            });
            return {
                ...state,
                posts: newPosts,
            };
        default:
            return state;

    }
}


const initPostItemState = {
    tooltipOpenGroup: {},
    commentOpenGroup: {}
};

export function postItem(state=initPostItemState, action) {
    switch (action.type) {
        case '@POST_ITEM/SET_TOOLTIP_TOGGLE':
            return {
                ...state,
                tooltipOpenGroup:{
                    ...state.tooltipOpenGroup,
                    [action.id]: action.tooltipOpen
                }
        };
        case '@POST_ITEM/TOGGLE_TOOLTIP':
        // console.log([action.id]);
        // console.log(state.tooltipOpenGroup[action.id])
        return {
            ...state,
            tooltipOpenGroup:{
                ...state.tooltipOpenGroup,
                [action.id]: !state.tooltipOpenGroup[action.id]
            }
        }
        case '@POST_ITEM/SET_COMMENT_OPEN':
        return {
            ...state,
            commentOpenGroup:{
                ...state.commentOpenGroup,
                [action.id]: state.commentOpenGroup[action.id] ? false : true
            }
        }
        case '@POST_ITEM/TOGGLE_COMMENT_OPEN':
        return {
            ...state,
            commentOpenGroup:{
                ...state.commentOpenGroup,
                [action.id]: !state.commentOpenGroup[action.id]
            }
        }
        default:
            return state;
    }
}

const initFormValue ={
    inputCommentValue: '',
    inputName: 'Anonymous'
}

const initCommentFormState = {
    inputCommentGroup:{}
};

export function commentForm(state=initCommentFormState, action) {
    switch (action.type) {
        case '@COMMENT_FORM/INPUT_COMMENT_VALUE':
            return {
                inputCommentGroup:{
                    ...state.inputCommentGroup,
                    [action.id]:{
                        inputCommentValue: action.inputCommentValue,
                        inputName: state.inputCommentGroup[action.id]? state.inputCommentGroup[action.id]['inputName']:'Anonymous'
                    }
                }
            };
        case '@COMMENT_FORM/INPUT_NAME':
            return {
                inputCommentGroup:{
                    ...state.inputCommentGroup,
                    [action.id]:{
                        inputCommentValue: state.inputCommentGroup[action.id]? state.inputCommentGroup[action.id]['inputCommentValue'] : '',
                        inputName: action.inputName 
                    }
                }
            };
        case '@COMMENT_FORM/RESET_INPUT_COMMENT':
            return {
                inputCommentGroup:{
                    ...state.inputCommentGroup,
                    [action.id]:initFormValue
                }
            };
        default:
            return state; 
    }
}

// const initCommentFormState = {
//     inputValueGroup:
//     inputCommentValue: '',
//     inputName: 'Anonymous'
// };

// export function commentForm(state=initCommentFormState, action) {
//     switch (action.type) {
//         case '@COMMENT_FORM/INPUT_COMMENT_VALUE':
//             return {
//                 ...state,
//                 inputCommentValue: action.inputCommentValue
//             };
//             break;
//         case '@COMMENT_FORM/INPUT_NAME':
//             return {
//                 ...state,
//                 inputName: action.inputName
//             };
//         case '@COMMENT_FORM/RESET_INPUT_COMMENT':
//             return initCommentFormState;
//         default:
//             return state; 
//     }
// }
