import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import {getMoodIcon} from 'utilities/weather.js';

import {connect} from 'react-redux';
import {createPost, setMood, setInputFormValue, setInputDanger, toggleMood, setMoodToggle} from 'states/post-actions.js'

import './PostForm.css';

export class PostForm extends React.Component {
    static propTypes = {
        inputFormValue: PropTypes.string,
        inputDanger: PropTypes.bool,
        moodToggle: PropTypes.bool,
        mood: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.inputEl = null;
        this.moodToggleEl = null;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleMoodToggle = this.handleMoodToggle.bind(this);

        this.handlePost = this.handlePost.bind(this);
    }

    render() {
        const {inputFormValue, moodToggle, mood, inputDanger} = this.props;
        const isInputDanger = inputDanger ? 'has-danger' : '';

        return (
            <div className='post-form'>
                <Alert color='info' className={`d-flex flex-column flex-sm-row justify-content-center`}>
                    <div className='mood align-self-start'>
                        <ButtonDropdown type='buttom' isOpen={moodToggle} toggle={this.handleMoodToggle}>
                            <DropdownToggle className='mood-toggle' type='button' caret color="secondary">
                                <i className={getMoodIcon(mood)}></i>&nbsp;{
                                    mood === 'na' ? 'Mood' : mood
                                }
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Clear')}><i className={getMoodIcon('Clear')}></i>&nbsp;&nbsp;Clear</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Clouds')}><i className={getMoodIcon('Clouds')}></i>&nbsp;&nbsp;Clouds</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Drizzle')}><i className={getMoodIcon('Drizzle')}></i>&nbsp;&nbsp;Drizzle</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Rain')}><i className={getMoodIcon('Rain')}></i>&nbsp;&nbsp;Rain</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Thunder')}><i className={getMoodIcon('Thunder')}></i>&nbsp;&nbsp;Thunder</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Snow')}><i className={getMoodIcon('Snow')}></i>&nbsp;&nbsp;Snow</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Windy')}><i className={getMoodIcon('Windy')}></i>&nbsp;&nbsp;Windy</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                    <Input className={`input ${isInputDanger}`} type='textarea' value={this.props.inputFormValue} onChange={this.handleInputChange} placeholder="What's on your mind?"></Input>
                    <Button className='btn-post align-self-end' color="info" onClick={this.handlePost}>Post</Button>
                </Alert>
            </div>
        );
    }

    handleDropdownSelect(mood) {
        // this.setState({mood: mood});
        this.props.dispatch(setMood(mood));
    }

    handleInputChange(e) {
        const text = e.target.value
        // this.setState({inputValue: text});
        this.props.dispatch(setInputFormValue(text))
        if (text) {
            // this.setState({inputDanger: false});
            this.props.dispatch(setInputDanger(false));
        }
    }

    handleMoodToggle(e) {
        this.props.dispatch(toggleMood());
    }

    handlePost() {
        if (this.props.mood === 'na') {
            this.props.dispatch(setMoodToggle(true));
            return;
        }
        if (!this.props.inputFormValue) {
            this.props.dispatch(setInputDanger(true))
            return;
        }
        this.props.dispatch(createPost(this.props.mood, this.props.inputFormValue));
        this.props.dispatch(setInputFormValue(""));
        this.props.dispatch(setMood("na"));
    }
}

export default connect(state=>{
    return {
        ...state.postForm,
    };
})(PostForm);