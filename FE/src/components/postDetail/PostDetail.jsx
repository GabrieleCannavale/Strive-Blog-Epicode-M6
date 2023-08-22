import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { blogPostById } from "../../reducers/postSlice";
import NavigationBar from '../navigationBar/NavigationBar';
import { Container } from 'react-bootstrap'

const PostDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	

	useEffect(() => {
		dispatch(blogPostById(id));
	}, [dispatch, id]);

	const singlePost = useSelector((state) => state.blogPosts.singlePost);
	//console.log(singlePost);

	return (
		<>
			<NavigationBar />
			{singlePost ? (
				<Container>
					<div className="my-5 pt-5">
						<h4 className="text-center mb-2 fs-3">{singlePost.title}</h4>
						<img
							className=" img-post-details shadow mb-2"
							src={singlePost.cover}
							alt=""
						/>
						<div>
							<em>
							 {/* Di: {singlePost.author.name} {singlePost.author.secondName}  */}
							</em>
						</div>
						<div>
							<span>Descrizione: {singlePost.content}</span>
						</div>
					</div>
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