import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { blogPostById } from "../../reducers/postSlice";
import { fetchCommentsByPost, createComment } from "../../reducers/commentsSlice";
import NavigationBar from '../navigationBar/NavigationBar';
import { Container, Form, Button, Card, ListGroup, Row, Col } from 'react-bootstrap';
import "./postDetail.css";

const PostDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [commentContent, setCommentContent] = useState('');
	const [rating, setRating] = useState(1);

	useEffect(() => {
		dispatch(blogPostById(id));
		dispatch(fetchCommentsByPost(id));
	}, [dispatch, id]);

	const singlePost = useSelector((state) => state.blogPosts.singlePost);
	const comments = useSelector((state) => state.comments.commentsArrayByPost);

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		dispatch(createComment({ content: commentContent, rating: rating, postId: id }))
		setCommentContent('');
		setRating(1);
	}

	return (
		<>
			<NavigationBar />
			{singlePost ? (
				<Container className="my-5 pt-5">
					<Row>
						<Col md={6}>
							<Card className="mb-4 shadow post-card">
								<Card.Img variant="top" src={singlePost.cover} />
								<Card.Body>
									<Card.Title className="mb-2 text-center">{singlePost.title}</Card.Title>
									<Card.Text>{singlePost.content}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md={6}>
							<Form onSubmit={handleCommentSubmit}>
								<Form.Group className="mb-3">
									<Form.Label>Add a comment</Form.Label>
									<Form.Control as="textarea" rows={3} value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Rating</Form.Label>
									<Form.Control type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
								</Form.Group>
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Form>

							<ListGroup className="mt-4 post-comments">
								{comments && comments.map((comment) => (
									<ListGroup.Item key={comment._id}>{comment.content}</ListGroup.Item>
								))}
							</ListGroup>
						</Col>
					</Row>
				</Container>
			) : (
				<div className="d-flex justify-content-center align-items-center div-100vh">
					LOADING...
				</div>
			)}
		</>
	)
}

export default PostDetail;
