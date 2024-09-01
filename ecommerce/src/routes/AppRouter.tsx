//Router:
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';


//pages:
import Home from '@pages/Home';
// import Categories from '@pages/Categories';
// import Product from '@pages/Product';
// import AboutUs from '@pages/AboutUs';
// import  Cart from '@pages/Cart';
// import Wishlists from '@pages/Wishlists';
// import Login from '@pages/Login';
// import Register from '@pages/Register';
// import Error from '@pages/Error';

//lazy loading for better ux:
const Categories = lazy(()=>import("@pages/Categories"))
const Product = lazy(()=>import("@pages/Product"))
const AboutUs = lazy(()=>import("@pages/AboutUs"))
const Cart = lazy(()=>import("@pages/Cart"))
const Wishlists = lazy(()=>import("@pages/Wishlists"))
const Login = lazy(()=>import("@pages/Login"))
const Register = lazy(()=>import("@pages/Register"))
const Error = lazy(()=>import("@pages/Error"))
const MainLayout = lazy(()=> import("@layouts/MainLayout/MainLayout"))
//layouts:
// import MainLayout from '@layouts/MainLayout/MainLayout'



const router = createBrowserRouter([
    {
        path:"/",
        element:<Suspense fallback="Loading please wait...">
                    <MainLayout />
                </Suspense>,
        errorElement: <Error />,
        children:[
            {index: true , element: <Home/>},
            {
                path:"categories",
                element:<Suspense fallback="Loading please wait...">
                            <Categories />
                        </Suspense>,
                        
            },
            {
                path: "categories/products/:prefix",
                element:<Suspense fallback="Loading please wait...">
                           <Product />
                        </Suspense>,
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
                element:<Suspense fallback="Loading please wait...">
                            <AboutUs />
                        </Suspense>,
            },
            {
                path:"login",
                element:<Suspense fallback="Loading please wait...">
                            <Login />
                        </Suspense>,
            },
            {
                path:"register",
                element:<Suspense fallback="Loading please wait...">
                            <Register />
                        </Suspense>,
            },
            {
              path:"cart",
              element:<Suspense fallback="Loading please wait...">
                          <Cart />
                      </Suspense>,
            },
            {
               path:"wishlist",
               element: <Suspense fallback="Loading please wait...">
                              <Wishlists />
                          </Suspense>,
            }


        ]
         
    }

])

const AppRouter = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default AppRouter