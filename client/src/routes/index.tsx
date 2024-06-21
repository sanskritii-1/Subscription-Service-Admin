import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
// import CurrentPlansPage from "../pages/CurrentPlansPage";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import SubscriptionPlans from "../pages/SubscriptionPlans";
import Login from "../components/Authentication/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login/>,
      },
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "subscription-plans",
        element: <SubscriptionPlans />,
      },
    ],
  },
]);

export default router;
