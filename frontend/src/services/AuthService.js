import fetch from "auth/FetchInterceptor";
import axios from "axios";
import apiBaseUrl from "configs/config";

const AuthService = {};

AuthService.login = function (data) {
  return fetch({
    url: "/auth/login",
    method: "post",
    data: data,
  });
};

AuthService.register = function (data) {
  return fetch({
    url: "/auth/register",
    method: "post",
    data: data,
  });
};
AuthService.signIn = async function (username, password) {
  try {
    const credentials = { username, password };
    const response = await axios.post(`${apiBaseUrl}/login`, credentials);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data; // Adjust error handling as needed
  }
};
AuthService.signOutRequest = function () {
  return fetch({
    url: "/auth/logout",
    method: "post",
  });
};
AuthService.signUp = async function (apiBaseUrl, credentials) {
  try {
    const response = await axios.post(`${apiBaseUrl}/register`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data; // Adjust error handling as needed
  }
};
export default AuthService;
