import React from 'react';
import PropTypes from 'prop-types';
import {
    Tooltip,
    Collapse
} from 'reactstrap';
import moment from 'moment';
import CommentForm from 'components/CommentForm.jsx'
import CommentList from 'components/CommentList.jsx'

import {getMoodIcon} from 'utilities/weather.js';
import {createVote} from 'api/posts.js';

import './PostItem.css';

export default class PostItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        mood: PropTypes.string,
        text: PropTypes.string,
        clearVotes: PropTypes.number,
        cloudsVotes: PropTypes.number,
        drizzleVotes: PropTypes.number,
        rainVotes: PropTypes.number,
        thunderVotes: PropTypes.number,
        snowVotes: PropTypes.number,
        windyVotes: PropTypes.number,
        comments:PropTypes.array,
        onVote: PropTypes.func,
        onComment: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            tooltipOpen: false,
            commentOpen: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleClearVote = this.handleClearVote.bind(this);
        this.handleCloudsVote = this.handleCloudsVote.bind(this);
        this.handleDrizzleVote = this.handleDrizzleVote.bind(this);
        this.handleRainVote = this.handleRainVote.bind(this);
        this.handleThunderVote = this.handleThunderVote.bind(this);
        this.handleSnowVote = this.handleSnowVote.bind(this);
        this.handleWindyVote = this.handleWindyVote.bind(this);
        this.handleCreateComment = this.handleCreateComment.bind(this);
        this.toggleComment = this.toggleComment.bind(this);
    }

    render() {
        const {id, mood, text, ts, clearVotes, cloudsVotes, drizzleVotes, rainVotes, thunderVotes, snowVotes, windyVotes, comments} = this.props;
        const {tooltipOpen, commentOpen} = this.state;

        return (
            <div className='post-item d-flex flex-column' >
                <div className='post d-flex'>
                    <div className='mood'><i className={getMoodIcon(mood)}></i></div>
                    <div className='wrap'>
                        <div className='ts'>{moment(ts * 1000).calendar()}</div>
                        <div className='text'>{text}</div>
                    </div>
                </div>
                <div className='vote d-flex justify-content-end'>
                    <div className='vote-results'>
                        {clearVotes > 0 && (<span><i className={getMoodIcon('Clear')}></i>&nbsp;{clearVotes}&nbsp;&nbsp;</span>)}
                        {cloudsVotes > 0 && <span><i className={getMoodIcon('Clouds')}></i>&nbsp;{cloudsVotes}&nbsp;&nbsp;</span>}
                        {drizzleVotes > 0 && <span><i className={getMoodIcon('Drizzle')}></i>&nbsp;{drizzleVotes}&nbsp;&nbsp;</span>}
                        {rainVotes > 0 && <span><i className={getMoodIcon('Rain')}></i>&nbsp;{rainVotes}&nbsp;&nbsp;</span>}
                        {thunderVotes > 0 && <span><i className={getMoodIcon('Thunder')}></i>&nbsp;{thunderVotes}&nbsp;&nbsp;</span>}
                        {snowVotes > 0 && <span><i className={getMoodIcon('Snow')}></i>&nbsp;{snowVotes}&nbsp;&nbsp;</span>}
                        {windyVotes > 0 && <span><i className={getMoodIcon('Windy')}></i>&nbsp;{windyVotes}&nbsp;&nbsp;</span>}
                    </div>
                    <div className='vote-plus'>
                        <i id={`post-item-vote-${id}`} className='fa fa-plus'></i>
                    </div>
                    <div className='comment'>
                        <span onClick={this.toggleComment}><i className='fa fa-comment-o'></i></span>
                    </div>
                </div>
                <Tooltip placement='left' isOpen={tooltipOpen} autohide={false} target={`post-item-vote-${id}`} toggle={this.handleTooltipToggle}>
                    <i className={`vote-tooltip ${getMoodIcon('Clear')}`} onClick={this.handleClearVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Clouds')}`} onClick={this.handleCloudsVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Drizzle')}`} onClick={this.handleDrizzleVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Rain')}`} onClick={this.handleRainVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Thunder')}`} onClick={this.handleThunderVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Snow')}`} onClick={this.handleSnowVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Windy')}`} onClick={this.handleWindyVote}></i>
                </Tooltip>

                <div className='comment-area'>
                    <Collapse isOpen={this.state.commentOpen}>
                        <CommentForm onComment={this.handleCreateComment}/>
                        <CommentList comments={comments}/>
                    </Collapse>
                </div>
            </div>
        );
    }

    handleClick() {
        this.setState({
          tooltipOpen: !this.state.tooltipOpen
        });
    }

    handleTooltipToggle() {
        this.setState((prevState, props) => ({
            tooltipOpen: !prevState.tooltipOpen
        }));
    }

    handleClearVote() {
        this.props.onVote(this.props.id, 'Clear');
        this.setState({
          tooltipOpen: false
        });
    }

    handleCloudsVote() {
        this.props.onVote(this.props.id, 'Clouds');
        this.setState({
          tooltipOpen: false
        });
    }

    handleDrizzleVote() {
        this.props.onVote(this.props.id, 'Drizzle');
        this.setState({
          tooltipOpen: false
        });
    }

    handleRainVote() {
        this.props.onVote(this.props.id, 'Rain');
        this.setState({
          tooltipOpen: false
        });
    }

    handleThunderVote() {
        this.props.onVote(this.props.id, 'Thunder');
        this.setState({
          tooltipOpen: false
        });
    }

    handleSnowVote() {
        this.props.onVote(this.props.id, 'Snow');
        this.setState({
          tooltipOpen: false
        });
    }

    handleWindyVote() {
        this.props.onVote(this.props.id, 'Windy');
        this.setState({
          tooltipOpen: false
        });
    }

    handleCreateComment(name, text) {
        this.props.onComment(this.props.id, name, text);
    }

    toggleComment() {
        this.setState({ commentOpen: !this.state.commentOpen});
    }


}
