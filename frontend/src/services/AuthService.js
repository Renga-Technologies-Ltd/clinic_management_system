import fetch from "auth/FetchInterceptor";
import axios from "axios";
import apiBaseUrl from "configs/config";
import { history } from "services/history";

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

    // Assuming the response data includes a 'roles' property
    const userRoles = response.data.roles;

    // Redirect based on user roles
    redirectToDashboard(userRoles);

    return response.data;
  } catch (error) {
    throw error.response.data; // Adjust error handling as needed
  }
};
const redirectToDashboard = (userRoles) => {
  // Assuming userRoles is an array
  const hasAdminRole = userRoles.includes("Admin");
  const hasDoctorRole = userRoles.includes("Doctor");
  const hasNurseRole = userRoles.includes("nurse");
  const hasReceptionistRole = userRoles.includes("receptionist");

  if (hasAdminRole) {
    history.push("/app/dashboards/default");
  } else if (hasDoctorRole) {
    history.push("/app/dashboards/doctor");
  } else if (hasNurseRole) {
    history.push("/app/dashboards/nurse");
  } else if (hasReceptionistRole) {
    history.push("/app/dashboards/reception");
  } else {
    history.push("/app/dashboards"); // Default dashboard for unknown roles
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
