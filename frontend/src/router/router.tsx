

import { createBrowserRouter } from 'react-router'
import GeneralPage from '../layouts/pages/GeneralPage';
import HomeScreen from '../app/home/HomeScreen';
import CustomersScreen from '../app/customers/CustomersScreen';
import CustomersCreateScreen from '../app/customers/CustomersCreateScreen';
import CustomersSearchScreen from '../app/customers/CustomersSearchScreen';
import CustomersUpdateScreen from '../app/customers/CustomersUpdateScreen';
import ReservationsScreen from '../app/reservations/ReservationsScreen';
import ReservationsCreateScreen from '../app/reservations/ReservationsCreateScreen';
import ReservationsSearchScreen from '../app/reservations/ReservationsSearchScreen';
import ReservationsCancelScreen from '../app/reservations/ReservationsCancelScreen';
import DishesScreen from '../app/dishes/DishesScreen';
import DishesPlatesScreen from '../app/dishes/DishesPlatesScreen';
import DishesSweetsScreen from '../app/dishes/DishesSweetsScreen';
import DishesDrinksScreen from '../app/dishes/DishesDrinksScreen';
import AdminScreen from '../app/login/AdminScreen';
import AdminLoginScreen from '../app/login/AdminLoginScreen';
import AdminCancelScreen from '../app/login/AdminCancelScreen';
import AdminPlatesScreen from '../app/login/AdminPlatesScreen';
import AdminReservationsScreen from '../app/login/AdminReservationsScreen';
import { ProtectedRoute } from '../common/auth/ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <GeneralPage/>,
        children: [
          {
            index: true,
            element: <HomeScreen/>
          },
          {
            path: "/customers",
            element: <CustomersScreen/>,
          },
          {
            path: "/customers/create",
            element: <CustomersCreateScreen/>,
          },
          {
            path: "/customers/search",
            element: <CustomersSearchScreen/>
          },
          {
            path: "/customers/update",
            element: <CustomersUpdateScreen/>,
          },
          {
            path: "/reservations",
            element: <ReservationsScreen/>,
          },
          {
            path: "/reservations/create",
            element: <ReservationsCreateScreen/>,
          },
          {
            path: "/reservations/search",
            element: <ReservationsSearchScreen/>,
          },
          {
            path: "/reservations/cancel",
            element: <ReservationsCancelScreen/>,
          },
          {
            path: "/dishes",
            element: <DishesScreen/>,
          },    
          {
            path: "/dishes/plates",
            element: <DishesPlatesScreen/>,
          },
          {
            path: "/dishes/sweets",
            element: <DishesSweetsScreen/>,
          },
          {
            path: "/dishes/drinks",
            element: <DishesDrinksScreen/>,
          },
          {
            path: "/admin/login",
            element: <AdminLoginScreen/>,
          },
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "/admin",
                element: <AdminScreen/>,
              },
              {
                path: "/admin/cancel",
                element: <AdminCancelScreen/>,
              },
              {
                path: "admin/plates",
                element: <AdminPlatesScreen/>,
              },
              {
                path: "/admin/reservations",
                element: <AdminReservationsScreen/>,
              },
            ]
          },
        ],
    },
]); 


