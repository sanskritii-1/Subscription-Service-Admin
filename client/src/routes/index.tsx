import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import AdminPanelPage from '../pages/AdminPanelPage';

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
                path:'AdminPanel',
                element:<AdminPanelPage/>
              },
        ],
    },
]);


export default router