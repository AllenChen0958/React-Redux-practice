import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const postKey = 'posts';



export function listPosts(searchText = '') {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listPosts(searchText));
        }, 500);
    });
}


// Simulated server-side code
function _listPosts(searchText = '') {
    let postString = localStorage.getItem(postKey);
    let posts = postString ? JSON.parse(postString) : [];
    if (posts.length > 0 && searchText) {
        posts = posts.filter(p => {
            return p.text.toLocaleLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        });
    }
    return posts;
};

export function createPost(mood, text) {
    return new Promise((resolve, reject) => {
        resolve(_createPost(mood, text));
    });
}

// Simulated server-side code
function _createPost(mood, text) {
    const newPost = {
        id: uuid(),
        mood: mood,
        text: text,
        ts: moment().unix(),
        clearVotes: 0,
        cloudsVotes: 0,
        drizzleVotes: 0,
        rainVotes: 0,
        thunderVotes: 0,
        snowVotes: 0,
        windyVotes: 0,
        comments:[]
    };
    const posts = [
        newPost,
        ..._listPosts()
    ];
    localStorage.setItem(postKey, JSON.stringify(posts));
    return newPost;
}

export function createVote(id, mood) {
    return new Promise((resolve, reject) => {
        resolve(_createVote(id, mood));
    });
}

// Simulated server-side code
function _createVote(id, mood) {
    const posts = _listPosts().map(p => {
        if (p.id === id) {
            p[mood.toLowerCase() + 'Votes']++;
        }
        return p;
    });
    localStorage.setItem(postKey, JSON.stringify(posts));
    const newPost = posts.find(p => p.id === id);
    return newPost;
}


export function createComment(id, name, text){
    return new Promise((resolve, reject) =>{
        resolve(_createComment(id, name, text));
    })
}

function _createComment(id, name, text){
    const newComment = {
        id: uuid(),
        post_id: id,
        name: name,
        text: text,
        ts: moment().unix(),
    }

    const posts = _listPosts().map(p => {
        if (p.id === id) {
            p['comments'] = [
                newComment,
                ...p['comments']
            ];
        }
        return p;
    });
    localStorage.setItem(postKey, JSON.stringify(posts));
    const newPost = posts.find(p => p.id === id);
    return newPost;
}
