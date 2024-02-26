import axios from "axios";

export async function addComment(productId, comment) {
  const res = await axios.post(
    `http://localhost:1111/comments/${productId}`,
    comment,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );
  return res.data;
}
