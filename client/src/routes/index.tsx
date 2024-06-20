import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
<<<<<<< refs/remotes/origin/CurrentPlan
import CurrentPlansPage from '../pages/CurrentPlansPage';
=======
>>>>>>> local

const router = createBrowserRouter([
    {
        
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
        ],
    },
]);


export default router