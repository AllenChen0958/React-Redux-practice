import {
    listPosts as listPostsFromApi,
    createPost as createPostFromApi,
    createVote as createVoteFromApi
} from 'api/posts.js';


/*.main search*/
export function setSearchText(searchText) {
    return {
        type: '@SEARCH_TEXT/SET_SEARCH_TEXT',
        searchText
    };
}

export function setInputValue(inputValue) {
    return {
        type: '@SEARCH_TEXT/SET_INPUT_VALUE',
        inputValue
    };

}

/*.PostForm */
export function setMood(mood){
    return{
        type: '@POST_FORM/SET_MOOD',
        mood
    };
}

export function setInputFormValue(inputFormValue){
    return {
        type: 'POST_FORM/SET_INPUT_FORM_VALUE',
        inputFormValue
    };
}

export function setInputDanger (inputDanger) {
    return {
        type: 'POST_FORM/SET_INPUT_DANGER',
        inputDanger
    };
}

export function toggleMood() {
    return{
        type: '@POST_FORM/TOGGLE_MOOD'
    };
}

export function setMoodToggle(mood) {
    return{
        type: '@POST_FORM/SET_MOOD_TOGGLE',
        mood: mood
    };
}

/*posts */
function startLoading() {
    return {
        type: "@POST/START_LOADING"
    }
}


function endLoading() {
    return {
        type: "@POST/END_LOADING"
    };
}

function endListPosts(posts) {
    return {
        type: '@POST/END_LIST_POSTS',
        posts
    };
}

// function endCreatePost(post) {
//     return {
//         type: '@'
//     }
// }

export function listPosts(searchText) {
    return (dispatch, getState) =>{
        dispatch(startLoading());
        listPostsFromApi(searchText).then(posts=>{
            dispatch(endListPosts(posts));
        }).catch(err=>{
            console.error('Error listing posts', err);
        }).then(()=>dispatch(endLoading()));
    };
};


export function createPost(mood, text){
    return (dispatch, getState) => {
        dispatch(startLoading());
        createPostFromApi(mood, text).then(()=>{
            console.log(getState());
            console.log(getState().searchText);
            dispatch(listPosts(getState().searchTextInput.searchText));
        }).catch(err=>{
            console.error('Error creating posts', err);
        }).then(()=>dispatch(endLoading()));
    }
};

// export function creatVote (id, mood) {
//     return (dispatch, getState) => {
//         dispatch(startLoading());
//         createVoteFromApi(id, mood).then(()=>{
//             dispatch(listPosts(getState().searchText));
//         })
//     }
// }