import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import ProgressBar from "../components/ProgressBar";
import MetricsChart from "../components/MetricsChart";

interface Metric {
    id: number;

    deviceName: string;

    cpuUsage: number;
    ramUsage: number;
    diskUsage: number;

    os: string;
    architecture: string;
    kernel: string;
    uptime: number;

    timestamp: string;
    lastSeen: string;

    agent: {
        agentId: string;
        status: string;
    };
}

function formatUptime(seconds: number): string {

    const days = Math.floor(seconds / 86400);

    const hours = Math.floor(
        (seconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (seconds % 3600) / 60
    );

    if (days > 0) {
        return `${days}d ${hours}h`;
    }

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
}

function DeviceDetails() {

    const { agentId } = useParams();

    const navigate = useNavigate();

    const [history, setHistory] = useState<Metric[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);
    


    useEffect(() => {

        if (!agentId) {
            return;
        }


        // -----------------------------------------
        // Load existing history
        // -----------------------------------------

        const loadHistory = async () => {

            try {

                setLoading(true);

                const response = await api.get(
                    `/metrics/history/${agentId}`
                );

                setHistory(response.data);

            } catch (err) {

                console.error(
                    "Failed to load device history:",
                    err
                );

                setError(
                    "Failed to load device history."
                );

            } finally {

                setLoading(false);

            }

        };


        loadHistory();


        // -----------------------------------------
        // WebSocket
        // -----------------------------------------

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const socket = new WebSocket(
            `ws://localhost:8080/ws?token=${encodeURIComponent(token)}`
        );


        socket.onopen = () => {

            console.log(
                "Device WebSocket connected"
            );

        };


        socket.onmessage = (event) => {

            try {

                const metric: Metric =
                    JSON.parse(event.data);


                console.log(
                    "Device received metric:",
                    metric
                );


                // Only accept metrics belonging
                // to this device

                if (
                    metric.agent.agentId !== agentId
                ) {
                    return;
                }


                // Add newest metric to beginning
                // of history

                setHistory(prev => {

                    const updated = [
                        metric,
                        ...prev
                    ];


                    // Keep only latest 20 points

                    return updated.slice(0, 20);

                });

            } catch (err) {

                console.error(
                    "Failed to parse WebSocket metric:",
                    err
                );

            }

        };


        socket.onerror = (error) => {

            console.error(
                "Device WebSocket error:",
                error
            );

        };


        socket.onclose = () => {

            console.log(
                "Device WebSocket disconnected"
            );

        };


        // -----------------------------------------
        // Cleanup
        // -----------------------------------------

        return () => {

            socket.close();

        };

    }, [agentId]);


    // -----------------------------------------
    // Loading
    // -----------------------------------------

    if (loading) {

        return (

            <div className="min-h-screen bg-black text-white p-10">

                <p className="text-zinc-400">
                    Loading device...
                </p>

            </div>

        );

    }


    // -----------------------------------------
    // Error
    // -----------------------------------------

    if (error) {

        return (

            <div className="min-h-screen bg-black text-white p-10">

                <p className="text-red-400">
                    {error}
                </p>

            </div>

        );

    }


    // -----------------------------------------
    // No data
    // -----------------------------------------

    if (history.length === 0) {

        return (

            <div className="min-h-screen bg-black text-white p-10">

                <button
                    onClick={() => navigate("/")}
                    className="
                        mb-6
                        px-4
                        py-2
                        bg-zinc-800
                        hover:bg-zinc-700
                        rounded-lg
                        text-sm
                        font-medium
                        transition
                    "
                >
                    ← Back to Dashboard
                </button>


                <h1 className="text-4xl font-bold">
                    Device Details
                </h1>

                <p className="text-zinc-400 mt-4">
                    No metrics found for this device.
                </p>

            </div>

        );

    }


    // -----------------------------------------
    // Latest metric
    // -----------------------------------------

    const latest = history[0];


    // Backend returns newest first.
    // Charts need oldest first.

    const chartData = [
        ...history
    ].reverse();


    return (

        <div className="min-h-screen bg-black text-white p-10">


            {/* -------------------------------- */}
            {/* Back Button */}
            {/* -------------------------------- */}

            <button
                onClick={() => navigate("/")}
                className="
                    mb-6
                    px-4
                    py-2
                    bg-zinc-800
                    hover:bg-zinc-700
                    border
                    border-zinc-700
                    hover:border-zinc-500
                    rounded-lg
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                "
            >
                ← Back to Dashboard
            </button>


            {/* -------------------------------- */}
            {/* Device Header */}
            {/* -------------------------------- */}

            <h1 className="text-4xl font-bold mb-2">

                🖥️ {latest.deviceName}

            </h1>


            <p className="text-zinc-500 font-mono mb-10">

                {latest.agent.agentId}

            </p>


            {/* -------------------------------- */}
            {/* System Information */}
            {/* -------------------------------- */}

            <div className="
                bg-zinc-900
                border
                border-zinc-700
                rounded-xl
                p-6
                mb-8
            ">

                <h2 className="text-xl font-bold mb-6">

                    System Information

                </h2>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-4
                    gap-6
                ">


                    <div>

                        <p className="text-zinc-500 text-sm">
                            Operating System
                        </p>

                        <p className="text-lg font-semibold">
                            {latest.os}
                        </p>

                    </div>


                    <div>

                        <p className="text-zinc-500 text-sm">
                            Architecture
                        </p>

                        <p className="text-lg font-semibold">
                            {latest.architecture}
                        </p>

                    </div>


                    <div>

                        <p className="text-zinc-500 text-sm">
                            Kernel
                        </p>

                        <p className="text-lg font-semibold">
                            {latest.kernel}
                        </p>

                    </div>


                    <div>

                        <p className="text-zinc-500 text-sm">
                            Uptime
                        </p>

                        <p className="text-lg font-semibold">
                            {formatUptime(latest.uptime)}
                        </p>

                    </div>

                </div>

            </div>


            {/* -------------------------------- */}
            {/* Current Usage */}
            {/* -------------------------------- */}

            <div className="
                bg-zinc-900
                border
                border-zinc-700
                rounded-xl
                p-6
                mb-8
            ">

                <h2 className="text-xl font-bold mb-6">

                    Current Usage

                </h2>


                <div className="space-y-6">

                    <ProgressBar
                        label="CPU"
                        value={latest.cpuUsage}
                    />

                    <ProgressBar
                        label="RAM"
                        value={latest.ramUsage}
                    />

                    <ProgressBar
                        label="Disk"
                        value={latest.diskUsage}
                    />

                </div>

            </div>


            {/* -------------------------------- */}
            {/* Historical Charts */}
            {/* -------------------------------- */}

            <div className="
                bg-zinc-900
                border
                border-zinc-700
                rounded-xl
                p-6
            ">

                <h2 className="text-xl font-bold mb-6">

                    Resource History

                </h2>


                <MetricsChart
                    data={chartData}
                />

            </div>


        </div>

    );

}

export default DeviceDetails;