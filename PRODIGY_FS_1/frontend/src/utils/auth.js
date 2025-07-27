// src/utils/auth.js

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const saveAuth = (token) => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
};
