import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({});
  //console.log(loginFormData);

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5051/login', loginFormData)
      if (res.data.token) {
        localStorage.setItem("userLoggedIn", JSON.stringify(res.data.token));
        navigate("/homepage")
      }
    } catch (error) {
      console.log(error)
    }
  };


  const loginGithubSubmit = () => {
    window.location.href = 'http://localhost:5051/auth/github'
  };

  const handleSignUpClick = () => {
    navigate("/registration"); 
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Brand</h2>
                  <p className=" mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    <Form onSubmit={loginSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>

                        <Button variant="dark" type="submit" onClick={loginGithubSubmit}>
                          Login GITHUB
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a className="text-primary fw-bold" onClick={handleSignUpClick}>
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;