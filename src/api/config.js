const token = localStorage.getItem("token");

export const config = {
  Authorization: token,
};
export const config1 = {
  "content-type": "multipart/form-data",
  Authorization: token,
};
