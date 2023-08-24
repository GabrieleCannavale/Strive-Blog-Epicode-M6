import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteBlogPost, getBlogPost } from '../../reducers/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { AiFillDelete } from 'react-icons/ai'

function PostCard({ post }) {
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem('userLoggedIn'));
  const tokenDecoded = jwtDecode(token);

  const handleDelete = () => {
    dispatch(deleteBlogPost(post._id)).then(() =>
      dispatch(getBlogPost())
    );
  };

  return (
    <Card style={{ width: '18rem', height: '450px', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Card.Img variant="top" src={post.cover} style={{width: '100%', height: '200px', objectFit: 'cover'}}  />
      <Card.Body className='d-flex flex-column justify-content-between'>
        <Card.Title className="text-primary">{post.title}</Card.Title>
        <Card.Text className="text-muted overflow-hidden" style={{ maxHeight: '6rem' }}>
          {post.content}
        </Card.Text>
        <Card.Footer className='d-flex justify-content-evenly'>
          <Link to={`/postDetail/${post._id}`} className='m-2'>
            <Button variant="outline-success">Read more</Button>
          </Link>

          {post.author._id === tokenDecoded.id && (
            <Button
              onClick={handleDelete}
              variant="outline-danger"
              className="m-2"
            >
              <AiFillDelete />
            </Button>
          )}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
