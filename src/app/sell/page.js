"use client";

import { useState } from "react";
import { addProduct } from "../utils/products";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function Sell() {
  const [product, setProduct] = useState({});
  const [image, setImage] = useState();
  const imageHandler = (e) => setImage(e.target.files[0]);
  const queryClient = useQueryClient();
  const onChangeHandler = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    mutate({ product, image });
    push("/");
  };
  const { mutate } = useMutation(addProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("products");
      toast.success(data.msg, {
        position: "bottom-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "colored",
        pauseOnHover: false,
      });
    },
    onError: (error) => {
      toast.error(data.msg, {
        position: "bottom-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "colored",
        pauseOnHover: false,
      });
    },
  });
  const { push } = useRouter();

  return (
    <Container>
      <Row
        className="d-flex justify-content-center align-items-center "
        style={{ height: "70vh" }}
      >
        <Col>
          <h1>Sell a new Product</h1>
          <Form className="w-100" onSubmit={onSubmitHandler}>
            <Container>
              <Row className="mb-3">
                <Col>
                  <Form.Group className="mb-3" controlId="formProductName">
                    <Form.Label> Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Name"
                      name="name"
                      onChange={onChangeHandler}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductPrice">
                    <Form.Label> Product Price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Price"
                      name="price"
                      onChange={onChangeHandler}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formProductDescription"
                  >
                    <Form.Label> Product Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Description"
                      name="description"
                      onChange={onChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formProductQuantity">
                    <Form.Label> Product Quantity</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Quantity"
                      name="quantity"
                      onChange={onChangeHandler}
                    />
                  </Form.Group>
                  <Form.Label> Product Category</Form.Label>
                  <Form.Select
                    className="mb-3"
                    aria-label="Default select example"
                    name="category"
                    onChange={onChangeHandler}
                  >
                    <option disabled selected>
                      Select Your Product's Category
                    </option>
                    <option value="Apparel & Acceessories">
                      Apparel & Acceessories
                    </option>
                    <option value="Baby Products">Baby Products</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Health and beauty">Health and beauty</option>
                    <option value="Mobile & Tablet">Mobile & Tablet</option>
                    <option value="Sport & Fitness">Sport & Fitness</option>
                  </Form.Select>
                  <Form.Group controlId="formProductImage" className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      onChange={imageHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button onClick={() => push("/")}>Cancel</Button>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button type="submit" className="">
                    Add Product
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Sell;
