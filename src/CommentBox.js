import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import axios from 'axios'
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

	handleCommentDelete = (id) => {
	 	axios.delete(`${this.props.url}/${id}`)
	 		.then(res => {
	 			console.log('Comment deleted');
	 		})
			.catch(err => {
			 	console.error(err);
			});
			setTimeout(() => { this.loadCommentsFromServer() }, 100)
	}

	handleCommentUpdate = (id, comment) => {
	//sends the comment id and new author/text to our api
		axios.put(`${this.props.url}/${id}`, comment)
		 	.catch(err => {
		 		console.log(err);
		 	})
			setTimeout(() => { this.loadCommentsFromServer() }, 100)
	}

	componentDidMount() {
		this.loadCommentsFromServer()
		// setInterval(this.loadCommentsFromServer, this.props.pollInterval)
	}

	render() {
		 return (
			<div style={ style.commentBox }>
				<h2>Comments:</h2>
				<CommentList 
					data={ this.state.data }
					onCommentDelete={ this.handleCommentDelete }
	 				onCommentUpdate={ this.handleCommentUpdate }
				/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
			</div>
		 )
	}
}

export default CommentBox;