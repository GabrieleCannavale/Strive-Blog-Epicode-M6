import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../postCard/PostCard';
import { nanoid } from 'nanoid';
import { getBlogPost } from '../../reducers/postSlice';
import { useEffect } from 'react';

function PostContainer() {
  const dispatch = useDispatch();
  const blogPosts = useSelector((state) => state.blogPosts)

  let postsArrayRedux = blogPosts?.postsArrayRedux || [];  // aggiunto controllo e default 

  useEffect(() => {
    dispatch(getBlogPost);
  }, []);

  return (
    <Container>
      <Row>
        {postsArrayRedux.map((post) => (
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