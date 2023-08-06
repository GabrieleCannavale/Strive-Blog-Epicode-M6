import Form from 'react-bootstrap/Form';
import React, { useRef } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { authorPost } from '../../reducers/authorSlice';
import { useDispatch } from 'react-redux';

function RegistrationAuthorForm() {

	const dispatch = useDispatch();
	const name = useRef("");
	const secondName = useRef("");
	const birthDate = useRef("");
	const email = useRef("");
	const password = useRef("");
	const avatar = useRef("");


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
		
	}

	return (
		<Container>
			<Row>
				<Col md={6} xs={9}>
					<Form>
						<Form.Control type="input" className='my-1' ref={name} placeholder="Name" />
						<Form.Control type="input" className='my-1' ref={secondName} placeholder="Second Name" />
						<Form.Control type="email" className='my-1' ref={email} placeholder="Enter email" />
						<Form.Control type="date" className='my-1' ref={birthDate} placeholder="Enter your birthdate" />
						<Form.Control type="password" className='my-1' ref={password} placeholder="Password" />
						<Form.Control type="file" className='my-1' ref={avatar} />

						<Button variant="success" onClick={handleSubmit}> SUBMIT </Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default RegistrationAuthorForm;