import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import React from "react";
import { useDispatch } from 'react-redux';
import { postBlogPosts } from "../../reducers/postSlice";
import jwt_decode from "jwt-decode";

function NewPostModal() {

  const dispatch = useDispatch();
  const category = useRef("");
  const title = useRef("");
  //const author = useRef("");
  const content = useRef("");
  const readTimeValue = useRef("");
  const readTimeUnit = useRef("");
  const cover = useRef("");

 
  
 
  const handleSubmitPost = () => {
    
    const token = localStorage.getItem("userLoggedIn");
    
    //Check if token exist
    if (token) {

      // Decode token
    const decodedToken = jwt_decode(token);
    
    //get author ID from decodedToken
    const authorId = decodedToken.id
    ;
      const postData = {
      category: category.current.value,
      title: title.current.value,
      author: authorId, // <= author ID from token here!
      content: content.current.value,
      readTime: {
        value: readTimeValue.current.value,
        unit: readTimeUnit.current.value,
      },
      cover: cover.current.files[0],
    }
      
    dispatch(postBlogPosts(postData)).then(() => handleClose())
    } else {
      
    }
    
  }
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type="input" className="my-1" ref={category} placeholder="Category" />
            <Form.Control type="input" className="my-1" ref={title} placeholder="Title" />
            {/* <Form.Control type="input" className="my-1" ref={author} placeholder="Author ID" /> */}
            <Form.Control type="input" className="my-1" ref={content} placeholder="Content" />
            <Form.Control type="input" className="my-1" ref={readTimeValue} placeholder="" />
            <Form.Control type="input" className="my-1" ref={readTimeUnit} defaultValue={"min"} placeholder="Title" />
            <Form.Label>add a post cover:</Form.Label>
            <Form.Control type="file" className="my-1" ref={cover} />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmitPost}>
                Post Now
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default NewPostModal;
