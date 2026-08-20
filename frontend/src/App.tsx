import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import DeviceDetails from "./pages/DeviceDetails";
import Login from "./pages/Login";

function App() {

    return (

        <>
            <Navbar />

            <Routes>
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/device/:agentId"
                    element={<DeviceDetails />}
                />

            </Routes>

        </>

    );

}

export default App;