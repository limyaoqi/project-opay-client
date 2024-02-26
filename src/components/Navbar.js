"use client";

import { Navbar, Dropdown, Image, Container, Form, Nav } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/AuthProvider";
import { useRouter } from "next/navigation";
import ac from "./ac.jpg";

function TopNav() {
  const {
    token,
    setToken,
    user,
    setUser: setUserData,
  } = useContext(AuthContext);
  const { push } = useRouter();
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async (value) => {
    try {
      const response = await fetch("http://localhost:1111/products");
      const json = await response.json();
      const result = json.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data:", error);
    }
  };

  const onChangeHandler = (value) => {
    setSearchName(value);
    if (value.length === 0) {
      setSearchResults([]); // Clear search results if input length is 0
    } else {
      fetchData(value);
    }
  };

  const handleProductClick = (productId) => {
    if (window.location.pathname === "/home") {
      push(`/products?id=${productId}`);
    } else {
      window.location.reload();
    }
  };

  const logoutHandler = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    push("/login");
  };

  return (
    <Container style={{ padding: "30px 20px" }} className="sticky-top w-100">
      <Navbar
        expand="lg"
        className="py-3 px-2"
        style={{
          backgroundColor: "rgb(255,255,255,0.7)",
          borderRadius: "20px",
          border: "3px solid black",
        }}
      >
        <Container className="justify-content-between w-100">
          {token ? (
            <>
              <Navbar.Brand
                href="/home"
                style={{ flex: 1, fontWeight: "bold" }}
              >
                <span style={{ color: "white" }}>O</span>pay
              </Navbar.Brand>
              <div className="d-flex justify-content-center flex-column">
                <Form className="d-flex" style={{ flex: 1 }}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    style={{
                      backgroundColor: "rgb(255,255,255,0.7)",
                      color: "black",
                      border: "2px solid black",
                    }}
                    onChange={(e) => onChangeHandler(e.target.value)}
                  />
                </Form>
                {searchName.length > 0 && searchResults.length > 0 && (
                  <div className="mt-3">
                    <ul className="list-group">
                      {searchResults.map((product) => (
                        <li
                          key={product.id}
                          className="list-group-item"
                          onClick={() => handleProductClick(product._id)}
                        >
                          {product.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="my-2 my-lg-0 ms-auto d-flex justify-content-center align-items-center h-100"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link
                    href="/sell"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Add Products
                  </Nav.Link>
                  <Nav.Link
                    href="/cart"
                    className="me-2"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    My Cart
                  </Nav.Link>
                  <div className="">
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        as={Image}
                        src={ac.src}
                        roundedCircle
                        width={40}
                        height={40}
                      />
                      <Dropdown.Menu>
                        <Dropdown.Item href="myproducts">
                          My Product
                        </Dropdown.Item>
                        <Dropdown.Item href="/orders">My Order</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logoutHandler}>
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            <>
              <Navbar.Brand
                href="/login"
                style={{ flex: 1, fontWeight: "bold" }}
              >
                <span style={{ color: "white" }}>O</span>pay
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="my-2 my-lg-0 ms-auto"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </Container>
  );
}

export default TopNav;
