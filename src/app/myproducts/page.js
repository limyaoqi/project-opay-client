"use client";

import { getMyProduct } from "../utils/products"; // Assume you have an API function to fetch user's products
import { useQuery } from "react-query";
import { Container, Row, Col, Button } from "react-bootstrap";
import MyProduct from "./MyProduct";
import { useRouter } from "next/navigation";

function MyProductsPage() {
  const { data, isLoading } = useQuery("products", getMyProduct);
  if (isLoading) return <div>Loading...</div>;
  const { push } = useRouter();
  return (
    <Container>
      {!data.length ? (
        <div className="d-flex justify-content-center align-items-center flex-column h-100">
          <h1>There is no nothing to show</h1>
          <Button onClick={() => push(`/sell`)}>Sell</Button>
        </div>
      ) : (
        <>
          <h1>My Products</h1>
          <Row
            style={{
              backgroundColor: "#B9B9B9",
              padding: "10px 5px",
              borderRadius: "3px",
            }}
            className="d-flex justify-content-between align-items-center text-center h-100 mb-3"
          >
            <Col>Image</Col>
            <Col>Name</Col>
            <Col>Price</Col>
            <Col>Description</Col>
            <Col>Quantity</Col>
            <Col>Edit</Col>
            <Col>Delete</Col>
          </Row>
        </>
      )}
      {!data ? null : data?.map((product) => <MyProduct product={product} />)}
    </Container>
  );
}

export default MyProductsPage;
