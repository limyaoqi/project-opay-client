import axios from "axios";

export async function createOrder() {
  const res = await axios.post(
    `http://localhost:1111/orders`,
    null,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );
  return res.data;
}

export async function getOrder() {
  const res = await axios.get(
    `http://localhost:1111/orders`,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );
  return res.data;
}
