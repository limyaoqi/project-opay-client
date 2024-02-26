import { Card, CardGroup } from "react-bootstrap";
import { useRouter } from "next/navigation";

function ProductItems({ product }) {
  const { push } = useRouter();
  return (
    <>
      <Card
        style={{
          width: "18rem",
          margin: "10px",
          borderRadius: "5px",
          border: "1px solid white",
        }}
        onClick={() => push(`/products?id=${product._id}`)}
      >
        <Card.Img
          variant="top"
          src={`http://localhost:1111/${product.image}`}
          style={{
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        />
        <Card.Body>
          <Card.Title>{product?.name}</Card.Title>
          <Card.Text>RM{product?.price}</Card.Text>
          <Card.Text>{product?.description}</Card.Text>
          <Card.Text>left:{product?.quantity}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProductItems;
