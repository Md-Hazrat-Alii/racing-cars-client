import { createBrowserRouter } from "react-router-dom";
import Login from "../../components/Authentication/Login/Login";
import SignUp from "../../components/Authentication/SignUp/SignUp";
import Blog from "../../components/Pages/Blog/Blog";
import Categories from "../../components/Pages/Categories/Categories";
import Category from "../../components/Pages/Category/Category";
import AddProduct from "../../components/Pages/Dashboard/AddProduct/AddProduct";
import AllSeller from "../../components/Pages/Dashboard/AllSeller/AllSeller";
import MyBookings from "../../components/Pages/Dashboard/MyBookings/MyBookings";
import MyProducts from "../../components/Pages/Dashboard/MyProducts/MyProducts";
import Home from "../../components/Pages/Home/Home/Home";
import Page404 from "../../components/Shared/page404/Page404";
import DashBoardLayout from "../../layout/DashBoardLayout";
import Main from "../../layout/Main";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import SellerRoute from "../SellerRoute/SellerRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Page404></Page404>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/categories',
                element: <Categories></Categories>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/categories/:name',
                element: <PrivetRoute><Category></Category></PrivetRoute>,
                loader: ({ params }) => fetch(`${process.env.REACT_APP_server_url}/categories/${params.name}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoute><DashBoardLayout></DashBoardLayout></PrivetRoute>,
        errorElement: <Page404></Page404>,
        children: [
            {
                path: '/dashboard',
                element: <MyBookings></MyBookings>
            },
            {
                path: '/dashboard/mybookings',
                element: <MyBookings></MyBookings>
            },
            {
                path: '/dashboard/add-product',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/my-products',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/all-seller',
                element: <AdminRoute><AllSeller></AllSeller></AdminRoute>
            }
        ]
    },
    {
        path: '*',
        element: <Page404></Page404>
    }
])