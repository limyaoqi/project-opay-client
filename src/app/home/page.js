"use client";

import {
  Container,
  Row,
  Carousel,
  Button,
  Image,
  Col,
  ButtonGroup,
  CardGroup,
} from "react-bootstrap";
import all from "./logo/all.png";
import apparel from "./logo/apparel.png";
import baby from "./logo/baby.png";
import food from "./logo/food.png";
import furniture from "./logo/furniture.png";
import grocery from "./logo/grocery.png";
import health from "./logo/health.png";
import mobile from "./logo/mobile.png";
import sport from "./logo/sport.png";
import { useState } from "react";
import { useQuery } from "react-query";
import { getProducts } from "../utils/products";
import ProductItems from "./productItems";
import { useRouter } from "next/navigation";
// import ProductCard from "./ProductCard";

function Home() {
  const [category, setCategory] = useState("All");
  const { data, isLoading } = useQuery("products", getProducts);
  const { push } = useRouter();

  const filteredProducts =
    category === "All"
      ? data
      : data?.filter((product) => product.category === category);

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center align-items-center h-100 mb-5">
          <h1>BEST SELLING PRODUCT</h1>
          <Carousel
            data-bs-theme="dark"
            style={{
              border: "4px solid black",
              borderRadius: "10px",
              padding: "0",
            }}
            className="w-100"
          >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`http://localhost:1111/1706583809268-nl.jpg`}
                alt="First slide"
                style={{ maxHeight: "80vh" }}
                onClick={() => push(`/products?id=65b8670177557c4f2eba106f`)}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`http://localhost:1111/1706585025607-salmon.webp`}
                alt="Second slide"
                style={{ maxHeight: "80vh" }}
                onClick={() => push(`/products?id=65b86bc18ab00307f52fc9e7`)}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`http://localhost:1111/1706583809268-nl.jpg`}
                alt="Third slide"
                style={{ maxHeight: "80vh" }}
                onClick={() => push(`/products?id=65b8670177557c4f2eba106f`)}
              />
            </Carousel.Item>
          </Carousel>
        </Row>
        <div
          className="d-flex justify-content-center"
          style={{ columnGap: "15px", flexWrap: "wrap" }}
        >
          <Button
            onClick={() => setCategory("All")}
            variant="light"
            style={{
              border: "2px solid black",
            }}
          >
            <Image src={all.src} style={{ height: "100px", width: "100px" }} />
          </Button>
          <Button
            onClick={() => setCategory("Apparel & Acceessories")}
            variant="light"
            style={{
              border: "2px solid black",
            }}
          >
            <Image
              src={apparel.src}
              style={{ height: "100px", width: "100px" }}
            />
          </Button>
          <Button
            onClick={() => setCategory("Baby Products")}
            variant="light"
            style={{
              border: "2px solid black",
            }}
          >
            <Image src={baby.src} style={{ height: "100px", width: "100px" }} />
          </Button>
          <Button
            onClick={() => setCategory("Food & Beverage")}
            variant="light"
            style={{
              border: "2px solid black",
            }}
          >
            <Image src={food.src} style={{ height: "100px", width: "100px" }} />
          </Button>
          <Button
            onClick={() => setCategory("Furniture")}
            variant="light"
            style={{
              border: "2px solid black",
            }}
          >
            <Image
              src={furniture.src}
              style={{ height: "100px", width: "100px" }}
            />
          </Button>
          <Button
            onClick={() => setCategory("Groceries")}
            variant="light"
            style={{
              border: "2px solid black",
            }}
          >
            <Image
              src={grocery.src}
              style={{ height: "100px", width: "100px" }}
            />
          </Button>
          <Button
            onClick={() => setCategory("Health and beauty")}
            variant="light"
            style={{
              border: "2px solid black",
            }}
          >
            <Image
              src={health.src}
              style={{ height: "100px", width: "100px" }}
            />
          </Button>
          <Button
            onClick={() => setCategory("Mobile & Tablet")}
            variant="light"
            style={{
              border: "2px solid black",
            }}
          >
            <Image
              src={mobile.src}
              style={{ height: "100px", width: "100px" }}
            />
          </Button>
          <Button
            onClick={() => setCategory("Sport & Fitness")}
            variant="light"
            style={{
              border: "2px solid black",
            }}
          >
            <Image
              src={sport.src}
              style={{ height: "100px", width: "100px" }}
            />
          </Button>
        </div>
        <br />
        <Row>
          <CardGroup>
            {!filteredProducts.length ? (
              <h2 className="mb-5">There is nothing to show</h2>
            ) : (
              filteredProducts?.map((product) => (
                <Col md={4} lg={3} key={product._id}>
                  <ProductItems product={product} key={product._id} />
                </Col>
              ))
            )}
          </CardGroup>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
