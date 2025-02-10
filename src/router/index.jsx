import Home from '../pages/Home';
import Tools from '../pages/Tools';
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'

const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/tools/:viewType', element: <Tools /> },
    ]
  },
  {
    path: '*', element: <Navigate to="/" />
  }
])

export default routers