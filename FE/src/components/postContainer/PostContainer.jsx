import Container from 'react-bootstrap/Container';
import { Button, Col, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../postCard/PostCard';
import { nanoid } from 'nanoid';
import { getBlogPost, postBlogPosts, filterPosts } from '../../reducers/postSlice';
import { useEffect, useState } from 'react';

function PostContainer() {
  const dispatch = useDispatch();
  const { postsArrayRedux } = useSelector((state) => state.blogPosts)
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const { value } = e.target;
    if (value === "") {
      dispatch(getBlogPost())
    }
    setSearchTerm(value)
  };

  const filteredResult = (e) => {
    e.preventDefault();
    dispatch(filterPosts(searchTerm))
  }

  useEffect(() => {
    dispatch(getBlogPost());
  }, []);

  return (
    <>
      <Container>
        <Form className="d-flex my-5" onSubmit={filteredResult}>
          <Form.Control
            type="search"
            placeholder="Search something and press ENTER"
            className="me-2"
            aria-label="Search"
            onChange={handleSearch}
          />
          <Button variant="outline-success" onClick={filteredResult}>Search</Button>
        </Form>
      </Container>
      <Container>
        <Row className='gap-2'>
          {postsArrayRedux && postsArrayRedux.map((post) => (
            <Col>
              <PostCard
                key={nanoid()}
                post={post}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default PostContainer;