import { useEffect, useState } from "react";
import api from "../services/api";
import DeviceCard from "../components/DeviceCard";
import MetricsChart from "../components/MetricsChart";
import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [metrics, setMetrics] = useState<any[]>([]);
    const [history, setHistory] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {

        // Load latest metrics once
        const loadLatest = async () => {

            try {

                const res = await api.get("/metrics/latest");

                setMetrics(res.data);

            } catch (err) {

                console.error(err);

            }

        };

        loadLatest();

        // Connecting the  WebSocket
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const socket = new WebSocket(
            `ws://localhost:8080/ws?token=${encodeURIComponent(token)}`
        );

        socket.onopen = () => {

            console.log("Connected");

        };

        socket.onmessage = (event) => {

            const metric = JSON.parse(event.data);

            console.log("Received metric:", metric);

            // Update existing card
            setMetrics(prev => {

                const index = prev.findIndex(
                    m => m.agent.agentId === metric.agent.agentId
                );

                if (index === -1) {

                    return [...prev, metric];

                }

                const updated = [...prev];

                updated[index] = metric;

                return updated;

            });

            // Append to chart
            setHistory(prev => {

                const updated = [...prev, metric];

                return updated.slice(-20);

            });

        };

        socket.onerror = (error) => {

            console.error(error);

        };

        socket.onclose = () => {

            console.log("Disconnected");

        };

        return () => socket.close();

    }, []);

    const onlineDevices = metrics.filter(
        m => m.agent.status === "ONLINE"
    ).length;

    const avgCPU =
        metrics.length === 0
            ? 0
            : metrics.reduce(
                (sum, m) => sum + m.cpuUsage,
                0
            ) / metrics.length;

    const avgRAM =
        metrics.length === 0
            ? 0
            : metrics.reduce(
                (sum, m) => sum + m.ramUsage,
                0
            ) / metrics.length;

    const avgDisk =
        metrics.length === 0
            ? 0
            : metrics.reduce(
                (sum, m) => sum + m.diskUsage,
                0
            ) / metrics.length;

    const activeAlerts = metrics.filter(

        m =>

            m.cpuUsage >= 90 ||

            m.ramUsage >= 90 ||

            m.diskUsage >= 95

    ).length;
    return (

        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-5xl 
            font-bold 
            mb-4 
            text-center
            ">
                PulseForge ⚡ Dashboard
            </h1>



            <div className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-5
    gap-6
    mb-10
">

                <StatCard
                    title="Online"
                    value={onlineDevices}
                    color="text-green-400"
                />

                <StatCard
                    title="Avg CPU"
                    value={`${avgCPU.toFixed(1)}%`}
                    color="text-cyan-400"
                />

                <StatCard
                    title="Avg RAM"
                    value={`${avgRAM.toFixed(1)}%`}
                    color="text-yellow-400"
                />

                <StatCard
                    title="Avg Disk"
                    value={`${avgDisk.toFixed(1)}%`}
                    color="text-purple-400"
                />

                <StatCard
                    title="Alerts"
                    value={activeAlerts}
                    color={
                        activeAlerts > 0
                            ? "text-red-400"
                            : "text-green-400"
                    }
                />

            </div>




            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">

                {metrics.map(metric => (

                    <DeviceCard

                        key={metric.agent.agentId}

                        metric={metric}

                    />

                ))}

            </div>

            <div className="mt-12">

                <MetricsChart data={history} />

            </div>

        </div>

    );

}

export default Dashboard;