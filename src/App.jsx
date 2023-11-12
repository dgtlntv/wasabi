import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Error from "./Routes/Error"
import Root from "./Routes/Root"
import Home from "./Routes/Home"
import ShadesPalette from "./Routes/ShadesPalette"
import DataVizPalette from "./Routes/DataVizPalette"

const router = createBrowserRouter([
    {
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "shadespalette",
                element: <ShadesPalette />,
            },
            {
                path: "datavizpalette",
                element: <DataVizPalette />,
            },
        ],
    },
])

export default function App() {
    return <RouterProvider router={router} />
}
