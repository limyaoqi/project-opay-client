import { Row, Col, Image, Badge } from "react-bootstrap";
import moment from "moment";

function OrderItem({ order }) {
  //   console.log(order);
  //   return;
  //   const date = purchaseDate.toLocaleDateString();
  //   const time = purchaseDate.toLocaleTimeString();
  //THIS IS THE OUTSIDE
  return (
    <div
      style={{
        backgroundColor: "#B9B9B9",
        color: "black",
        border: "4px solid black",
        borderRadius: "5px",
      }}
    >
      <h5 style={{ paddingTop: "5px", paddingLeft: "5px" }}>
        <Badge bg="secondary">
          {moment(order.purchase_date).format("MMMM Do YYYY, h:mm:ss a")}
        </Badge>
      </h5>
      {order.items.map((item) => (
        <Row className="d-flex justify-content-between align-items-center text-center m-3">
          <Col>
            <Image
              src={`http://localhost:1111/${item?.product?.image}`}
              style={{
                objectFit: "cover",
                width: "80%",
                borderRadius: "3px",
                height: "140px",
              }}
            />
          </Col>
          <Col>
            {item?.product?.name} X {item?.quantity}
          </Col>
          <Col>{item?.subtotal}</Col>
        </Row>
      ))}
    </div>
  );
}

export default OrderItem;
