import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import DeviceDetails from "./pages/DeviceDetails";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";


function ProtectedLayout() {

    return (

        <>
            <Navbar />

            <Outlet />
        </>

    );

}


function App() {

    return (

        <Routes>

            {/* Public route */}

            <Route
                path="/login"
                element={<Login />}
            />


            {/* Protected routes */}

            <Route element={<ProtectedRoute />}>

                <Route element={<ProtectedLayout />}>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/device/:agentId"
                        element={<DeviceDetails />}
                    />

                </Route>

            </Route>

        </Routes>

    );

}

export default App;