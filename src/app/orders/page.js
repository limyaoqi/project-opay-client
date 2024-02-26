"use client";

import { Col, Container, Row } from "react-bootstrap";
import { getOrder } from "../utils/orders";
import { useQuery } from "react-query";
import OrderItem from "./OrderItem";

function OrderPage() {
  const { data, isLoading } = useQuery("orders", getOrder);
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <Container>
      <div
        style={{
          backgroundColor: "#B9B9B9",
          color: "black",
          border: "4px solid black",
          borderRadius: "5px",
        }}
      >
        <Row className="d-flex justify-content-between align-items-center text-center m-3">
          <Col>Image</Col>
          <Col>Name</Col>
          <Col>Subtotal</Col>
        </Row>
      </div>
      {data.map((order) => (
        <OrderItem order={order} />
      ))}
    </Container>
  );
}

export default OrderPage;
