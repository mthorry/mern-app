import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import axios from 'axios'
// import DATA from './data';
import style from './style';

class CommentBox extends Component {
	state = { data: [] };

	loadCommentsFromServer = () => {
		axios.get(this.props.url)
		.then(res => {
			this.setState({ data: res.data })
		})
	}

	handleCommentSubmit = (comment) => {
		let comments = this.state.data;
		comment['_id'] = Date.now(); //temp id for page render
		let newComments = comments.concat([comment]);
		
		this.setState({ data: newComments });
		
		axios.post(this.props.url, comment)
			.catch(err => {
				console.error(err);
				this.setState({ data: comments });
			});
	}

	componentDidMount() {
		this.loadCommentsFromServer()
		// setInterval(this.loadCommentsFromServer, this.props.pollInterval)
	}

	render() {
		console.log(this.state.data)
		 return (
			<div style={ style.commentBox }>
				<h2>Comments:</h2>
				<CommentList data={ this.state.data }/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
			</div>
		 )
	}
}

export default CommentBox;