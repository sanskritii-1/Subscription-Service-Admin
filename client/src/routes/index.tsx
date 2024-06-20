import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import CurrentPlansPage from '../pages/currentPlansPage';

const router = createBrowserRouter([
    {
        
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path:'currentPlans',
                element:<CurrentPlansPage/>
              },
        ],
    },
]);


export default router