import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

// Login
import Login from "./views/login";

// Dashboard
import Dashboard from "./views/dashboard";

// Users
import users from "./views/users";
import AddUser from "./views/users/AddUser";
import userDetails from "./views/users/userDetails";

// 404
import Page404 from "./views/Page404";

// List of routes
const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: DefaultLayout,
  },
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/users",
    exact: true,
    name: "Users",
    component: users,
  },
  {
    path: "/user/new",
    exact: true,
    name: "New User",
    component: AddUser,
  },
  {
    path: "/user/edit/:id",
    exact: true,
    name: "User Details",
    component: userDetails,
  },
  {
    path: "",
    exact: true,
    name: "Page Not Found",
    component: Page404,
  },
];

export default routes;
