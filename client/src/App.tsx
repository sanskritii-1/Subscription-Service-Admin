import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import AdminPanelPage from './pages/PaymentInfoPage';
import Home from './pages/Home';
import PaymentInfoPage from './pages/PaymentInfoPage';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '', element: <Home /> },
      { path: 'PaymentInfo' ,element: <PaymentInfoPage/>},
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;