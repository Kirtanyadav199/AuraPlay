import {createBrowserRouter} from 'react-router'
import Login from './Features/auth/Pages/Login'
import Register from './Features/auth/Pages/Register'
import Protected from './Features/auth/Components/Protected'


export const router = createBrowserRouter([
    {
        path:"/",
        element: <Protected><h1>Home</h1></Protected>
    },
    {
       path:"/login",
       element: <Login/>
    },
    {
        path:'/register',
        element:<Register/>
    }
])