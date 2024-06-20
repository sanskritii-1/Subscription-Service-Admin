import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
<<<<<<< refs/remotes/origin/CurrentPlan
import CurrentPlansPage from './pages/CurrentPlansPage';
import Home from './pages/Home';
=======
import Home from './pages/Home';
import InfoPage from './pages/InfoPage';
import CurrentPlanPage from './pages/CurrentPlan';
>>>>>>> local

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '', element: <Home /> },
<<<<<<< refs/remotes/origin/CurrentPlan
      { path: 'Plans-User' ,element: <CurrentPlansPage/>},
=======
      { path: 'PaymentInfo' ,element: <InfoPage/>},
      { path: 'CurrentPlan', element: <CurrentPlanPage/> },
>>>>>>> local
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;