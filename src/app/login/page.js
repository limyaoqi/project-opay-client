"use client";

import { useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { login } from "../utils/users";
import { useRouter } from "next/navigation";
import { AuthContext } from "../AuthProvider";

function Login() {
  const { push } = useRouter();
  const [user, setUser] = useState({});
  const { setToken, setUser: setUserData } = useContext(AuthContext);

  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let data = await login(user);
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
      setToken(data.token);
      setUserData(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      push("/");
    }
  };
  // console.log(bg);
  return (
    <Container fluid>
      <Row style={{ height: "70vh" }}>
        <Col
          className="d-flex justify-content-center align-items-center h-100"
          style={{ backgroundColor: "black" }}
        >
          <h1 className="text-white">
            <span style={{ color: "gold" }}>O</span>pay
          </h1>
        </Col>
        <Col
          className="d-flex justify-content-center align-items-center h-100"
          style={{ backgroundColor: "white", color: "black" }}
        >
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={onChangeHandler}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChangeHandler}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group> */}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}></Row>
    </Container>
  );
}

export default Login;
