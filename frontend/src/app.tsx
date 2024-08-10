import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

import CreateTripPage from "./pages/create-trip"
import TripDetailsPage from "./pages/trip-details"

export function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <CreateTripPage />,
        },
        {
            path: "/trips/:tripId",
            element: <TripDetailsPage />,
        },
    ])

    return <RouterProvider router={router} />
}