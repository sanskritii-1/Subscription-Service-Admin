import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import HomePage from "./pages/Home";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import LoginPage from "./pages/LoginPage";
import InfoPage from './pages/InfoPage';
import CurrentPlanPage from './pages/CurrentPlanPage';
import PlanAnalytics from "./components/PlanAnalytics/PlanAnalytics";
import UserAnalytics from "./components/UserAnalytics/UserAnalytics";



function App() {
  const routers = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <HomePage />,
    // },
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/subscription-plans",
      element: <SubscriptionPlans />,
    },
    {
      path: "/current-plans",
      element: <CurrentPlanPage />,
    },
    { 
      path: '/PaymentInfo' ,
      element: <InfoPage/>
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
      path: "/plan-analytics",
      element: <PlanAnalytics />,
    },
    {
      path: "/user-analytics",
      element: <UserAnalytics />,
    },
  ]);
  return <RouterProvider router={routers} />;
}

export default App;
