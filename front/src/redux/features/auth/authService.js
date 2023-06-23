import axios from "axios";

const ROOT_URL = "/api/user/";

// Register

const register = async (userData) => {
  const response = await axios.post(ROOT_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login

const login = async (userData) => {
  const response = await axios.post(ROOT_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;