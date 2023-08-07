import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../postCard/PostCard';
import { nanoid } from 'nanoid';
import { getBlogPost, postBlogPosts } from '../../reducers/postSlice';
import { useEffect } from 'react';

function PostContainer() {
  const dispatch = useDispatch();
  const { postsArrayRedux } = useSelector((state) => state.blogPosts)

  useEffect(() => {
    dispatch(getBlogPost());
  }, []);

  return (
    <Container>
      <Row>
       {postsArrayRedux && postsArrayRedux.map((post) => (
              <PostCard
                key={nanoid()}
                post={post}
              />
            ))} 
      </Row>
    </Container>
  );
}

export default PostContainer;