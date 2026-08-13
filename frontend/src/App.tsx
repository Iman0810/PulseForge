import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import DeviceDetails from "./pages/DeviceDetails";

function App() {

    return (

        <>
            <Navbar />

            <Routes>

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