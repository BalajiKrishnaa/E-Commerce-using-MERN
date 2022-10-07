import React, { useState } from "react";
import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../services/appApi";
import './auth.css'
const Register = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const[signup,{error,isLoading,isError}] =useSignupMutation()
  const handleSignUp = (e) => {
    e.preventDefault()
    signup({name,email,password})
  };
  return (
   <Container>
    <Row>
      <Col md={5} className="register_form--container">
        <Form style={{ width: "100%" }} onSubmit={handleSignUp}>
          <h1>Create your Account</h1>
          {isError&&<Alert variant="danger">{error.data}</Alert>}
          <Form.Group>
            <Form.Control type="text" className="mb-3" placeholder="Enter userName" value={name} onChange={(e)=>setName(e.target.value)} required />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" className="mb-3" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
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
            Register
          </Button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </Form>
      </Col>
      <Col md={7} className="register_image--container"></Col>
    </Row>
    </Container>
  )
}

export default Register