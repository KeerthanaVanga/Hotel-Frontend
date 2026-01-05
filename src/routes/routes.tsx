import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import RootLayout from "../components/layout/RootLayout";


const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const DashboardLayout = lazy(
  () => import("../components/layout/DashboardLayout")
);
const AuthPage = lazy(() => import("../pages/AuthPage"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const CheckInPage = lazy(() => import("../pages/Check_In"));
const CheckOutPage = lazy(() => import("../pages/Check_Out"));
const CalenderPage = lazy(() => import("../pages/Calender"));
const InventoryPage = lazy(() => import("../pages/Inventory"));
const ReportsPage = lazy(() => import("../pages/Reports"));
const UsersPage = lazy(() => import("../pages/Users"));
const RoomsPage = lazy(() => import("../pages/Rooms"));
const BookingsPage = lazy(() => import("../pages/Bookings"));
const PaymentsPage = lazy(() => import("../pages/Payments"));
const ReviewsPage = lazy(() => import("../pages/Reviews"));
const WhatsAppBotPage = lazy(() => import("../pages/Whatsapp"));
const RoomsDetailsPage = lazy(() => import("../components/rooms/RoomDetailsPage"));
const RoomsEditPage = lazy(() => import("../components/rooms/RoomFormPage"));
const InventoryDetailsPage = lazy(() => import("../pages/InventoryDetails"));
const OffersPage = lazy(() => import("../pages/OffersPage"));
const OffersFormPage = lazy(() => import("../pages/OffersForm"));


const router = createBrowserRouter([
  {
    element: <RootLayout />, // 👈 IMPORTANT
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/auth",
            element: <AuthPage />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
              {
                path: "/checkin",
                element: <CheckInPage />,
              },
              {
                path: "/checkout",
                element: <CheckOutPage />,
              },
              {
                path: "/calendar",
                element: <CalenderPage />,
              },
              {
                path: "/inventory",
                element: <InventoryPage />,
              },
              {
               path:"/inventory/:propertyToken",
               element:<InventoryDetailsPage/>

              },
              {
                path: "/reports",
                element: <ReportsPage />,
              },
              {
                path: "/users",
                element: <UsersPage />,
              },
              {
                path: "/rooms",
                children:[
                  {
                    index:true,
                    element:<RoomsPage/>
                  },
                  {
                    path:":roomId",
                    element:<RoomsDetailsPage/>
                  },{
                    path:":roomId/edit",
                    element:<RoomsEditPage/>
                  },
                  {
                    path:"new",
                    element:<RoomsEditPage/>
                  }
                ]
              },
              {
                path: "/bookings",
                element: <BookingsPage />,
              },
              {
                path:'/offers',
                children:[
                  {
                    index:true,
                    element:<OffersPage/>
                  },
                  {
                    path:"new",
                    element:<OffersFormPage/>
                  },
                  {
                    path:":offerId/edit",
                    element:<OffersFormPage/>
                  },
                ]
              },
              {
                path: "/payments",
                element: <PaymentsPage />,
              },
              {
                path: "/reviews",
                element: <ReviewsPage />,
              },
              {
                path: "/whatsapp",
                element: <WhatsAppBotPage />,
              }
            ],
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;