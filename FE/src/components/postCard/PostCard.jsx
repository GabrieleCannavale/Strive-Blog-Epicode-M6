import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteBlogPost, getBlogPost } from '../../reducers/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';


function PostCard({ post }) {
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem('userLoggedIn'));
  const tokenDecoded = jwtDecode(token);
  // console.log(tokenDecoded);

  const postsArrayRedux = useSelector((state) => state.blogPosts.postsArrayRedux);
  //console.log(postsArrayRedux)


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

        <Link to={`/postDetail/${post._id}`}>
          <Button variant="primary">Read more...</Button>
        </Link>

        {post.author._id === tokenDecoded.id ? (<Button
          onClick={handleDelete}
          variant="outline-danger"
          className="border-2"
        >
          DELETE
        </Button>) : ("")}
      </Card.Body>
    </Card>
  );
}

export default PostCard;