import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {connect} from 'react-redux';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import {cancelWeather} from 'api/open-weather-map.js';
import {getWeather} from 'states/weather-actions.js';
import PostForm from 'components/PostForm.jsx';
import PostList from 'components/PostList.jsx';
import {createPost, createVote, createComment} from 'api/posts.js';
import {listPosts} from 'states/post-actions.js';
import './Today.css';

class Today extends React.Component {
    static propTypes = {
        city: PropTypes.string,
        code: PropTypes.number,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string,
        weatherLoading: PropTypes.bool,
        masking: PropTypes.bool,
        dispatch: PropTypes.func,
        searchText: PropTypes.string
    };

    constructor(props) {
        super(props);

        // this.state = {
        //     postLoading: false,
        //     posts: []
        // };

        // this.handleCreatePost = this.handleCreatePost.bind(this);
        // this.handleCreateVote = this.handleCreateVote.bind(this);
        // this.handleCreateComment = this.handleCreateComment.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getWeather('Hsinchu', this.props.unit));
        // this.listPosts(this.props.searchText);
        this.props.dispatch(listPosts(this.props.searchText));
    }

    componentWillUnmount() {
        if (this.state.weatherLoading) {
            cancelWeather();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            // this.listPosts(nextProps.searchText);
            this.props.dispatch(listPosts(nextProps.searchText));
        }
    }

    render() {
        const {city, group, description, temp, unit, masking, posts, postLoading} = this.props;

        document.body.className = `weather-bg ${group}`;
        document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

        return (
            <div className='today'>
                <div className='weather'>
                    <WeatherForm city={city} defaultUnit={unit} submitAction={getWeather} />
                    <WeatherDisplay {...{group, description, temp, unit, masking}} day='today'/>
                </div>
                <div className='posts'>
                    <PostForm/>
                    <PostList posts={posts}/>{
                        postLoading &&
                        <Alert color='warning' className='loading'>Loading...</Alert>
                    }
                </div>
            </div>
        );
    }

}


export default connect((state) => {
    return {
        ...state.weather,
        unit: state.unit,
        searchText: state.searchTextInput.searchText,
        ...state.post
    };
})(Today);
