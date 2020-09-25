import Axios from "axios";
export const getLoggedIn = async () => {
  try {
    const res = await Axios.get("/api/user/isloggedin");
    return res.data;
  } catch (err) {
    return console.log(err);
  }
};

export const signup = async (data) => {
  return Axios.post("/api/user/signup", data)
    .then((res) => {
     
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = async (data) => {
  try {
    const res = await Axios.post("/api/user/signin", data);
     return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const logout = async () => {
  try {
    const res = await Axios.get("/api/user/logout");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const FormUpload = async (form) => {
  try {
    const res = await Axios.post("/api/file/upload", form, {
      headers: {
        Accept: "application/json",
        ContentType: "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getFiles = async () => {
  try {
    const res = await Axios.get("/api/user/getFile");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
