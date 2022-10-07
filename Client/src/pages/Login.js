import React, { useState } from "react";
import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSigninMutation } from "../services/appApi";
import './auth.css'
const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const[signin,{error,isLoading,isError}] =useSigninMutation()
    const handleSignIn = (e) => {
      e.preventDefault()
      signin({email,password})
    };
  return (
    <Container>
      <Row>
        <Col md={5} className="login_form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSignIn}>
          {isError&&<Alert variant="danger">{error.data}</Alert>}
            <h1>Login to your Account</h1>
            <Form.Group>
              <Form.Control className="mb-3" type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Control
              className="mb-3"
                type="password"
                placeholder="Enter your password"
                value={password} onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="outline-primary" type="submit" disabled={isLoading} className="mb-3">
              Login
            </Button>
            <p>Don't have an account? <Link to="/register">Create account</Link></p>
          </Form>
        </Col>
        <Col md={7} className="login_image--container"></Col>
      </Row>
    </Container>
  );
};

export default Login;
