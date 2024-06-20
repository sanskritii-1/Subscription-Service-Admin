import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import PaymentInfoPage from '../pages/PaymentInfoPage';

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
                path:'PaymentInfo',
                element:<PaymentInfoPage/>
              },
        ],
    },
]);


export default router