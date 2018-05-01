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
import {connect} from 'react-redux';
import './CommentForm.css';
import {createComment, setInputCommentValue, setInputName} from 'states/post-actions.js';

export class CommentForm extends React.Component {
    static propTypes = {
        inputCommentValue: PropTypes.string,
        inputName: PropTypes.string,
        id: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleComment = this.handleComment.bind(this);
    }

    render() {
        // const {inputValue} = this.state;
        const {inputCommentValue, inputName} = this.props;

        return (
            <div className='comment-form d-flex flex-column flex-sm-row'>
                <div className='c-name d-flex'>
                    <Input className='input' type='text' bsSize='sm' value={this.props.inputName} onChange={this.handleNameChange} ></Input>
                </div>
                <Input className='input' type='text' bsSize='sm' value={this.props.inputCommentValue} onChange={this.handleInputChange} placeholder="Make a comment"></Input>
                <Button className='align-self-end' size='sm' color="lightgrey" onClick={this.handleComment}>Reply</Button>
            </div>
        );
    }

    handleNameChange(e) {
        this.props.dispatch(setInputName(this.props.id, e.target.value));
    }

    handleInputChange(e) {
        this.props.dispatch(setInputCommentValue(this.props.id, e.target.value));
    }

    handleComment() {
        if (!this.props.inputCommentValue) {
            return;
        }
        this.props.dispatch(createComment(this.props.id, this.props.inputName, this.props.inputCommentValue));
    }
}
export default connect((state, ownProps)=>{
    return {
        inputCommentValue: state.commentForm.inputCommentGroup[ownProps.id]?state.commentForm.inputCommentGroup[ownProps.id].inputCommentValue : '',
        inputName: state.commentForm.inputCommentGroup[ownProps.id]?state.commentForm.inputCommentGroup[ownProps.id].inputName: 'Anonymous'
    };
})(CommentForm);