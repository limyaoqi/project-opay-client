import axios from "axios";

export const getProducts = async () => {
  const res = await axios.get(`http://localhost:1111/products`);
  return res.data;
};

export const getProductsById = async (id) => {
  const res = await axios.get(`http://localhost:1111/products/` + id);
  return res.data;
};

export const getProductsByName = async (name) => {
  const res = await axios.get(`http://localhost:1111/products/search/` + name);
  return res.data;
};

export const getMyProduct = async () => {
  const res = await axios.get(`http://localhost:1111/products/myproducts`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`http://localhost:1111/products/` + id, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
};

export const addProduct = async ({ product, image }) => {
  //<form enctype="multipart/form-data">
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("description", product.description);
  formData.append("quantity", product.quantity);
  formData.append("category", product.category);
  formData.append("image", image);

  const res = await axios.post(`http://localhost:1111/products`, formData, {
    headers: { "x-auth-token": localStorage.getItem("token") },
  });
  return res.data;
};

export const updateProduct = async ({ updatedProduct, image }) => {
  let formData = new FormData();
  formData.append("name", updatedProduct.name);
  formData.append("price", updatedProduct.price);
  formData.append("description", updatedProduct.description);
  formData.append("quantity", updatedProduct.quantity);
  formData.append("image", image);

  const res = await axios.put(
    `http://localhost:1111/products/${updatedProduct._id}`,
    formData,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );

  return res.data;
};
