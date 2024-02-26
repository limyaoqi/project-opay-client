import { Button, Col, Form, Image, Row, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { deleteProduct, updateProduct } from "../utils/products";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

function MyProduct({ product }) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const onChangeHandler = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };
  const [image, setImage] = useState();

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const { mutate } = useMutation(deleteProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("products");
      toast.success(data.msg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
        pauseOnHover: false,
      });
    },
    onError: (error) => {
      toast.error(data.msg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
        pauseOnHover: false,
      });
    },
  });

  const { mutate: updateMutation } = useMutation(updateProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("products");
      toast.success(data.msg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
        pauseOnHover: false,
      });
    },
    onError: (error) => {
      toast.error(data.msg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
        pauseOnHover: false,
      });
    },
  });

  const updateHandler = (e, id) => {
    e.preventDefault();
    updateMutation({ updatedProduct, image });
    setShowForm(false)
  };

  const deleteHandler = () => {
    mutate(product._id);
  };
  return (
    <Row
      className="mb-4"
      style={{
        backgroundColor: "#B9B9B9",
        borderRadius: "3px",
        padding: "15px 10px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center text-center h-100 mb-3">
        <Col>
          <Image
            src={`http://localhost:1111/${product.image}`}
            style={{
              objectFit: "cover",
              width: "100%",
              borderRadius: "3px",
              height: "140px",
            }}
          />
        </Col>
        <Col>{product.name}</Col>
        <Col>{product.price}</Col>
        <Col>{product.description}</Col>
        <Col>{product.quantity}</Col>
        <Col>
          <Button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Icon.PencilSquare />
          </Button>
        </Col>
        <Col>
          <Button className="btn btn-danger" onClick={deleteHandler}>
            <Icon.Trash3 />
          </Button>
        </Col>
      </div>
      {showForm ? (
        <Form className="w-100 mt-5" onSubmit={updateHandler}>
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
                    value={updatedProduct.name}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProductPrice">
                  <Form.Label> Product Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Price"
                    name="price"
                    onChange={onChangeHandler}
                    value={updatedProduct.price}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProductDescription">
                  <Form.Label> Product Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Description"
                    name="description"
                    onChange={onChangeHandler}
                    value={updatedProduct.description}
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
                    value={updatedProduct.quantity}
                  />
                </Form.Group>
                <Form.Label> Product Category</Form.Label>
                <Form.Select
                  className="mb-3"
                  aria-label="Default select example"
                  name="category"
                  onChange={onChangeHandler}
                  value={updatedProduct.category}
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
                <Button onClick={() => setShowForm(false)}>Cancel</Button>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button type="submit">
                  Edit Product
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      ) : null}
    </Row>
  );
}

export default MyProduct;
