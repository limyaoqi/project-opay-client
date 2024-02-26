"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import CartItem from "./CartItem";
import { getCart } from "../utils/cart";
import { emptyCart } from "../utils/cart";
import { createOrder } from "../utils/orders";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Paypal from "@/components/Paypal";

function Cart() {
  const { data, isLoading } = useQuery("cart", getCart);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(emptyCart, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("cart");
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
  const deleteHandler = () => {
    mutate();
  };
  const { mutate: orderMutate } = useMutation(createOrder, {
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

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <>
      {!data?.items ? (
        <h2>There is nothing here</h2>
      ) : (
        <Container
          style={{
            backgroundColor: "#B9B9B9",
            color: "black",
            border: "4px solid black",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          <Row className="d-flex justify-content-between  text-center  mb-4">
            <Col></Col>
            <Col>Name</Col>
            <Col>Price</Col>
            <Col>Quantity</Col>
            <Col>Subtotal</Col>
            <Col></Col>
          </Row>
          {data?.items?.map((item, i) => (
            <CartItem item={item} key={i} />
          ))}
          <Row className="d-flex justify-content-between align-items-center text-center h-100">
            <Col></Col>
            <Col></Col>
            <Col>
              <Button
                className="btn btn-danger"
                onClick={() => deleteHandler()}
              >
                Empty Cart
              </Button>
            </Col>
            <Col>
              <Paypal />
            </Col>
            <Col>Total:{data.total}</Col>
            <Col></Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Cart;
