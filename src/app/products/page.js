"use client";

const { Container, Row, Form, Col, Card, Button } = require("react-bootstrap");
import { getProductsById } from "@/app/utils/products";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { useSearchParams } from "next/navigation";
import * as Icon from "react-bootstrap-icons";
import { AuthContext } from "@/app/AuthProvider";
import { useState, useContext } from "react";
import { addToCart } from "../utils/cart";
import { addComment } from "../utils/comment";
import { toast } from "react-toastify";

function ProductPage() {
  const { user } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const queryClient = useQueryClient();

  const likeHandler = async () => {
    let res = await fetch("http://localhost:1111/likes/" + id, {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    await res.json();
    queryClient.invalidateQueries("products");
  };

  const getTimeDifference = (commentCreatedAt) => {
    const commentDate = new Date(commentCreatedAt);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - commentDate.getTime();
    const minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Convert milliseconds to minutes

    if (minutesDifference < 60) {
      return `${minutesDifference} minute${
        minutesDifference !== 1 ? "s" : ""
      } ago`;
    } else {
      const hoursDifference = Math.floor(minutesDifference / 60);
      if (hoursDifference < 24) {
        return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
      } else {
        const daysDifference = Math.floor(hoursDifference / 24);
        return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
      }
    }
  };

  const [quantity, setQuantity] = useState(1);
  const onChangeHandler = (e) => setQuantity(e.target.value);
  const { mutate } = useMutation(addToCart, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart", "orders"]);
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
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (quantity < 1) return alert("Minimum quantity should be at least 1");
    if (quantity > data.quantity)
      return alert("Quantity should not exceed available quantity");
    mutate({ quantity, productId });
    e.target.reset();
  };

  const [comment, setComment] = useState({});
  const commentChangeHandler = (e) => setComment({ ...comment, content: e.target.value });

  const commentSubmitHandler = async (e) => {
    e.preventDefault();

    let data = await addComment(productId, comment);

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
    queryClient.invalidateQueries("products");
    e.target.reset();
  };

  const { data, isLoading } = useQuery("products", () => getProductsById(id));
  if (isLoading) return <h2>Loading...</h2>;
  const productId = data._id;
  const foundUser = data?.likes?.find((like) => like.liker === user?._id);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Img
              variant="top"
              src={`http://localhost:1111/${data.image}`}
              style={{
                height: "400px",
                objectFit: "cover",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />
            <Card.Body
              style={{
                backgroundColor: "#B9B9B9",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-between w-100">
                <Card.Title>{data?.name}</Card.Title>
                {foundUser ? (
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid black",
                      color: "black",
                    }}
                    onClick={likeHandler}
                  >
                    unlike
                    <Icon.Heartbreak style={{ margin: "2px" }} />
                  </Button>
                ) : (
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid black",
                      color: "black",
                    }}
                    onClick={likeHandler}
                  >
                    like
                    <Icon.Heart style={{ margin: "2px" }} />
                  </Button>
                )}
              </div>

              <Card.Text>RM{data?.price}</Card.Text>
              <Card.Text>{data?.description}</Card.Text>
              <div className="d-flex justify-content-between">
                <Card.Text>left:{data?.quantity}</Card.Text>
                <div>
                  <Form
                    onSubmit={onSubmitHandler}
                    className="d-flex justify-content-center"
                  >
                    <Form.Group controlId="formAddToCart">
                      <Form.Control
                        type="number"
                        placeholder="Quantity"
                        name="password"
                        onChange={onChangeHandler}
                        style={{ width: "120px" }}
                      />
                    </Form.Group>
                    <Button type="submit" className="btn btn-danger">
                      Add to Cart
                    </Button>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: "80vh" }}>
            <Card.Body style={{ maxHeight: "100%", overflowY: "auto" }}>
              {data?.comments?.map((comment) => (
                <Container key={comment.comment?.id}>
                  <Row className="align-items-start">
                    <Col xs={3}>{comment?.comment?.user?.username}</Col>
                    <Col xs={6}>
                      <div>{comment?.comment?.content}</div>
                    </Col>
                    <Col xs={3} className="text-right">
                      {!comment.comment ? null :getTimeDifference(comment?.comment?.created_at)}
                    </Col>
                  </Row>
                </Container>
              ))}
            </Card.Body>
            <Form
              onSubmit={commentSubmitHandler}
              style={{ padding: "0 10px 10px 10px" }}
            >
              <Form.Control
                type="search"
                placeholder="Add Comment"
                aria-label="Search"
                name="contenta"
                style={{
                  backgroundColor: "rgb(255,255,255,0.7)",
                  color: "black",
                  border: "2px solid black",
                }}
                onChange={commentChangeHandler}
              />
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;
