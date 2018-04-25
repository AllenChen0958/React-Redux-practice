import React from 'react';
import PropTypes from 'prop-types';
import {
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import './CommentForm.css';

export default class CommentForm extends React.Component {
    static propTypes = {
        onComment: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            inputValue: props.city,
            inputName: 'Anonymous'
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleComment = this.handleComment.bind(this);
    }

    render() {
        const {inputValue} = this.state;

        return (
            <div className='comment-form d-flex flex-column flex-sm-row'>
                <div className='c-name d-flex'>
                    <Input className='input' type='text' bsSize='sm' value={this.state.inputName} onChange={this.handleNameChange} ></Input>
                </div>
                <Input className='input' type='text' bsSize='sm' value={this.state.inputValue} onChange={this.handleInputChange} placeholder="Make a comment"></Input>
                <Button className='align-self-end' size='sm' color="lightgrey" onClick={this.handleComment}>Reply</Button>
            </div>
        );
    }

    handleNameChange(e) {
        const name = e.target.value;
        this.setState({inputName: name});
    }

    handleInputChange(e) {
        const text = e.target.value;
        this.setState({inputValue: text});
    }

    handleComment() {
        if (!this.state.inputValue) {
            return;
        }

        this.props.onComment(this.state.inputName, this.state.inputValue);
        this.setState({
            inputValue: ''
        });
    }
}
