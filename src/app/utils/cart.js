import axios from "axios";

export async function addToCart(product) {
  const res = await axios.post(
    `http://localhost:1111/carts`,
    product,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );
  return res.data;
}

export async function getCart() {
    const res = await axios.get(
      `http://localhost:1111/carts`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    return res.data;
  }

  export async function deleteCartItem(productId) {
    const res = await axios.delete(
      `http://localhost:1111/carts/${productId}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    return res.data;
  }
  
  export async function emptyCart() {
    const res = await axios.delete(
      `http://localhost:1111/carts`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    return res.data;
  }