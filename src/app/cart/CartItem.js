import { useMutation, useQueryClient } from "react-query";
import { deleteCartItem } from "../utils/cart";
import { Button, Col, Image, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { toast } from "react-toastify";

function CartItem({ item }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteCartItem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
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
    mutate(item.product._id);
  };

  return (
    <>
      <Row className="d-flex justify-content-between align-items-center text-center h-100 mb-4">
        <Col>
          <Image
            src={`http://localhost:1111/${item.product.image}`}
            style={{
              objectFit: "cover",
              width: "100%",
              borderRadius: "3px",
              height: "140px",
            }}
          />
        </Col>
        <Col>{item.product.name}</Col>
        <Col>{item.product.price}</Col>
        <Col>{item.quantity}</Col>
        <Col>{item.subtotal}</Col>
        
        <Col>
          <Button className="btn btn-danger" onClick={deleteHandler}>
            <Icon.Trash3 />
          </Button>
        </Col>
      </Row>
    </>
  );
}
export default CartItem;
