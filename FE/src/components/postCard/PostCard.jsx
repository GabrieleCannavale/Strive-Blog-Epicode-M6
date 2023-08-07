import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function PostCard({post}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={post.cover} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.content}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default PostCard;