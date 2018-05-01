import {
    listPosts as listPostsFromApi,
    createPost as createPostFromApi,
    createVote as createVoteFromApi,
    createComment as createCommentFromApi
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

function endCreatePost(post) {
    return {
        type: '@POST/END_CREATE_POST',
        post
    }
}


function endCreateVote(post) {
    // console.log(post);
    return {
        type: '@POST/END_CREATE_VOTE',
        post
    }
}


function endCreateVote(post) {
    // console.log(post);
    return {
        type: '@POST/END_CREATE_COMMENT',
        post
    }
}


function endCreateComment (post) {
    return {
        type: '@POST/END_CREATE_COMMENT',
        post
    }
}
/*postItem*/

export function setTooltipToggle (id, tooltipOpen) {
    return {
        type: '@POST_ITEM/SET_TOOLTIP_TOGGLE',
        id,
        tooltipOpen
    };
}

export function toggleTooltip(id) {
    return {
        type: '@POST_ITEM/TOGGLE_TOOLTIP',
        id
    };
}

export function setCommentOpen (commentOpen) {
    return{
        type: '@POST_ITEM/SET_COMMENT_OPEN',
        commentOpen
    }
}

//add setDefaultComment
export function toggleCommentOpen (id) {
    return {
        type: '@POST_ITEM/TOGGLE_COMMENT_OPEN',
        id
    }; 
}


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
        createPostFromApi(mood, text).then(post=>{
            dispatch(endCreatePost(post));
            dispatch(listPosts(''));
        }).catch(err=>{
            console.error('Error creating posts', err);
        }).then(()=>dispatch(endLoading()));
    }
};

export function createVote (id, mood) {
    return (dispatch, getState) => {
        createVoteFromApi(id, mood).then((post)=>{
            // console.log(post)
            dispatch(endCreateVote(post));
        }).catch(err=>{
            console.error('Error creating vote', err);
        }).then(()=>{
            dispatch(setTooltipToggle(false));
        });
    }
};

export function createComment (id, name, text) {
    return (dispatch, getState) => {
        createCommentFromApi(id, name, text).then((post)=>{
            dispatch(endCreateComment(post));
        }).catch(err=>{
            console.error('Error creating vote', err);
        }).then(()=>{
            dispatch(resetInputComment(id));
        });
    };
}

/*comment form*/
export function setInputCommentValue(id, inputCommentValue) {
    return {
        type: '@COMMENT_FORM/INPUT_COMMENT_VALUE',
        inputCommentValue,
        id
    };
}

export function setInputName (id, inputName) {
    return {
        type: '@COMMENT_FORM/INPUT_NAME',
        inputName,
        id
    };
}

export function resetInputComment (id) {
    return {
        type: '@COMMENT_FORM/RESET_INPUT_COMMENT',
        id
    };
}