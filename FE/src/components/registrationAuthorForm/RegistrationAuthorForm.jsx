import Form from 'react-bootstrap/Form';
import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { authorPost }  from '../../reducers/authorSlice';
import {useDispatch} from 'react-redux';

function RegistrationAuthorForm() {
	const dispatch = useDispatch();
	const name = useRef(null);
	const secondName = useRef(null);
	const birthDate = useRef(null);
	const email = useRef(null);
	const password = useRef(null);
	const avatar = useRef(null);


	const handleSubmit = () => {
		
		const data = {
			name: name.current.value,
			secondName: secondName.current.value,
			birthDate: birthDate.current.value,
			email: email.current.value,
			password: password.current.value,
			avatar: avatar.current.files[0],
		}

		dispatch(authorPost(data));
		/* console.log(
			name.current.value,
			secondName.current.value,
			birthDate.current.value,
			email.current.value,
			password.current.value,
			avatar.current.files[0],
			) */
	}
	
	return (

    <Form>
		<Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>NAME</Form.Label>
        <Form.Control type="input" ref={name} placeholder="Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>SECOND NAME</Form.Label>
        <Form.Control type="input" ref={secondName} placeholder="Second Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>EMAIL ADDRESS</Form.Label>
        <Form.Control type="email" ref={email} placeholder="Enter email" />
      </Form.Group>
	  <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>BIRTH DATE</Form.Label>
        <Form.Control type="date" ref={birthDate} placeholder="Enter your birthdate" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>PASSWORD</Form.Label>
        <Form.Control type="password" ref={password} placeholder="Password" />
		<Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>AVATAR</Form.Label>
        <Form.Control type="file" ref={avatar}/>
      </Form.Group>
      </Form.Group>
	  <Button variant = "success" onClick= {handleSubmit}> SUBMIT </Button>
    </Form>
  );
}

export default RegistrationAuthorForm;