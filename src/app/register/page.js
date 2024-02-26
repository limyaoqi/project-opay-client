"use client";

import { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { register } from "../utils/users";
import { useRouter } from "next/navigation";

function Register() {
  const [user, setUser] = useState({});
  const { push } = useRouter();
  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log(user)
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (user.password !== user.password2) {
      toast.error("Password does not match", {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
        pauseOnHover: false,
      });
    }

    let data = await register(user);

    if (data.status) {
      toast.error(data.msg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
        pauseOnHover: false,
      });
    } else {
      toast.success(data.msg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
        pauseOnHover: false,
      });
    }
  };
  return (
    <Container fluid>
      <h2>Register An Account</h2>

      <Row style={{ height: "70vh" }}>
        <Col
          className="d-flex justify-content-center align-items-center h-100"
          style={{ backgroundColor: "#B9B9B9", color: "black" }}
        >
          <h1>
            <span style={{ color: "white" }}>O</span>pay
          </h1>
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center h-100"
          style={{ backgroundColor: "black" }}
        >
          <Form onSubmit={onSubmitHandler} autoComplete="off">
            <Form.Group className="mb-3" controlId="formBasicFullname">
              <Form.Label> Fullname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Fullname"
                name="fullname"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label> Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChangeHandler}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                onChange={onChangeHandler}
                autoComplete="off"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={() => push("/login")}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
