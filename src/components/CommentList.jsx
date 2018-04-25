import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import moment from 'moment';

import './CommentList.css';

export default class CommentList extends React.Component {
    static propTypes = {
        comments: PropTypes.array

    };

    constructor(props) {
        super(props);

        this.state = {
        };

    }

    render() {
        const {comments} = this.props;


        let children = (
            <div></div>
        );
        if (comments.length) {
            children = comments.map(c => (
                <ListGroupItem key={c.id} action>
                    <div className='comment-item d-flex flex-column' >
                        <div className='comment-info d-flex'>
                            <div className='comment-info name'><i>{c.name}</i></div>
                            <div className='comment-info c-ts ml-auto'>{moment(c.ts * 1000).calendar()}</div>
                        </div>
                        <div className='comment-text'>{c.text}</div>
                    </div>
                </ListGroupItem>
            ));
        }

        return (
            <div className='comment-list'>
                <ListGroup>{children}</ListGroup>
            </div>
        );
    }


}
