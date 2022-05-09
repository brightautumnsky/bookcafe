import axios from "axios";
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
  ADD_BOOKMARK_USER,
  DELETE_BOOKMARK_USER,
} from "./types";

export function register(data) {
  const request = axios
    .post(`/api/users/register`, data)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function login(data) {
  const request = axios
    .post("/api/users/login", data)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function logout() {
  const request = axios
    .get("/api/users/logout")
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
