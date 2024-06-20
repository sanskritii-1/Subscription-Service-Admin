import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import CurrentPlansPage from './pages/CurrentPlansPage';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '', element: <Home /> },
      { path: 'Plans-User' ,element: <CurrentPlansPage/>},
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;