import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import InfoPage from './pages/InfoPage';
import CurrentPlanPage from './pages/CurrentPlanPage';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '', element: <Home /> },
      { path: 'PaymentInfo' ,element: <InfoPage/>},
      { path: 'CurrentPlan', element: <CurrentPlanPage/> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;