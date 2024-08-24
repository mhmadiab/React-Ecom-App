//Router:
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { lazy, Suspense } from 'react';


//pages:
import Home from '@pages/Home';
import Categories from '@pages/Categories';
import Product from '@pages/Product';
import AboutUs from '@pages/AboutUs';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Error from '@pages/Error';

// const Categories = lazy(()=>import("@pages/Categories"))
// const Product = lazy(()=>import("@pages/Product"))
// const AboutUs = lazy(()=>import("@pages/AboutUs"))

//layouts:
import MainLayout from '@layouts/MainLayout/MainLayout'



const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout />,
        errorElement: <Error />,
        children:[
            {index: true , element: <Home/>},
            {
                path:"categories",
                element:<Categories />
                        
            },
            {
                path: "products/:prefix",
                element: <Product />,
                loader: ({ params }) => {
                  if (
                    typeof params.prefix !== "string" ||
                    !/^[a-z]+$/i.test(params.prefix)
                  ) {
                    throw new Response("Bad Request", {
                      statusText: "Category not found",
                      status: 400,
                    });
                  }
                  return true;
                },
              },
            {
                path:"aboutus",
                element:<AboutUs />
            },
            {
                path:"login",
                element:<Login />
            },
            {
                path:"register",
                element:<Register />
            },


        ]
         
    }

])

const AppRouter = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default AppRouter