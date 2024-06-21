import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Create from "./pages/Create";
import CurrentPlansPage from "./pages/CurrentPlansPage";
import Edit from "./pages/Edit";
import HomePage from "./pages/Home";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import LoginPage from "./pages/LoginPage";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/subscription-plans",
      element: <SubscriptionPlans />,
    },
    {
      path: "/current-plan-details",
      element: <CurrentPlansPage />,
    },
    {
      path: "edit/:id",
      element: <Edit />,
    },
    {
      path: "create",
      element: <Create />,
    },
  ]);
  return <RouterProvider router={routers} />;
}

export default App;
