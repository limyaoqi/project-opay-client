import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useMutation, useQueryClient } from "react-query";
import { createOrder as orderCreate } from "@/app/utils/orders";

const style = { layout: "vertical" };

const ButtonWrapper = ({ showSpinner, mutate, subtotal }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  function createOrder() {
    const items = [
      {
        sku: "1blwyeo8",
        quantity: 2,
        price: 10, // Price per item
      },
    ];
    const subtotal = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    // replace this url with your server
    return fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
          cart: [
            {
              sku: "1blwyeo8",
              quantity: 2,
            },
          ],
        }),
      }
    )
      .then((response) => response.json())
      .then((order) => {
        // Your code here after create the order
        return order.id;
      });
  }
  function onApprove(data) {
    // replace this url with your server
    return fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    )
      .then((response) => response.json())
      .then((orderData) => {
        // Your code here after capture the order
        alert("Transaction Approved");
        mutate();
      });
  }
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </>
  );
};

function Paypal() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(orderCreate, {
    onSuccess: (data) => {
      alert("Transaction Approved");
      queryClient.invalidateQueries("orders");
      queryClient.invalidateQueries("cart");
    },
  });

  const options = {
    currency: "USD",
    components: "buttons",
    clientId:
      "AfN7dsT4RECCk2Dz0w5WUCJ3-CpQ-rD6jxeMfLPmp33TQwU9usZNzMkxFe0aYAchJ22Kmrdxvusx3FOK",
  };
  return (
    <PayPalScriptProvider options={options}>
      <ButtonWrapper showSpinner={false} mutate={mutate} />
    </PayPalScriptProvider>
  );
}

export default Paypal;
