import axios from "axios";

export const register = async (user) => {
  // console.log(user)
  // return
  const res = await axios.post(
    `http://localhost:1111/users/register`
    ,
    user
  );
  return res.data;
};

export const login = async (user) => {
  const res = await axios.post(
    `http://localhost:1111/users/login`
    ,
    user
  );
  return res.data;
};
