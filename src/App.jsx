import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import TopNavbar from './components/TopNavbar/TopNavbar'
import MainLayout from './layouts/MainLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [

		]
	},
	
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;