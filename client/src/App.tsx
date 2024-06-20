import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import CurrentPlansPage from './pages/CurrentPlansPage';
import Home from './pages/Home';
import Create from "./components/CreateAndEditPlans/Create";
import Edit from "./components/CreateAndEditPlans/Edit";
import SubscriptionPlans from "./components/Allplans/Plans";

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '', element: <Home /> },
      { path: 'Plans-User' ,element: <CurrentPlansPage/>},
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

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;