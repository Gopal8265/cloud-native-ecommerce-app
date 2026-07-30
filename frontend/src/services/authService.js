import API from "../api/axios";

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);

  if (response.data.data.token) {
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.data.user)
    );
  }

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};