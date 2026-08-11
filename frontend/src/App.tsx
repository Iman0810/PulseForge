import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import DeviceDetails from "./pages/DeviceDetails";

import Navbar from "./components/Navbar";

function App() {

    return (

        <BrowserRouter>

        <Navbar/>

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

        </BrowserRouter>

    );

}

export default App;