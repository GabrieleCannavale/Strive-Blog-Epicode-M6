import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteBlogPost, getBlogPost } from '../../reducers/postSlice';
import { useDispatch } from 'react-redux';



function PostCard({ post }) {
  const dispatch = useDispatch();


  const handleDelete = () => {
    dispatch(deleteBlogPost(post._id)).then(() =>
    dispatch(getBlogPost()))
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={post.cover} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.content}
        </Card.Text>
        <Button variant="primary">see comments</Button>
        <Button
          onClick={handleDelete}
          variant="outline-danger"
          className="border-2"
        >
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PostCard;