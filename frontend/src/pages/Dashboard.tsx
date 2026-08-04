import { useEffect, useState } from "react";
import api from "../services/api";
import DeviceCard from "../components/DeviceCard";
import MetricsChart from "../components/MetricsChart";

function Dashboard() {

    const [metrics, setMetrics] = useState<any[]>([]);
    const [history, setHistory] = useState<any[]>([]);

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
        const socket = new WebSocket("ws://localhost:8080/ws");

        socket.onopen = () => {

            console.log("Connected");

        };

        socket.onmessage = (event) => {

            const metric = JSON.parse(event.data);

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

    return (

        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-5xl font-bold mb-12 text-center">

                PulseForge ⚡ Dashboard

            </h1>

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