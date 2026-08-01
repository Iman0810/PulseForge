import { useEffect, useState } from "react";
import api from "../services/api";
import DeviceCard from "../components/DeviceCard";
import MetricsChart from "../components/MetricsChart";

function Dashboard() {
    const [metrics, setMetrics] = useState<any[]>([]);

    // key = agentId
    // value = array of metrics for that agent
    const [histories, setHistories] = useState<Record<string, any[]>>({});

    useEffect(() => {

        const socket = new WebSocket("ws://localhost:8080/ws");

        socket.onopen = () => {
            console.log("Connected");
        };

        socket.onmessage = (event) => {

            const metric = JSON.parse(event.data);

            setMetrics(prev => {

                const index = prev.findIndex(
                    m => m.agent.agentId === metric.agent.agentId
                );

                if (index === -1){
                    return [...prev, metric];
                }

                const updated = [...prev];
                updated[index] = metric;

                return updated;

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

        <div className="
        min-h-screen
        bg-black
        text-white
        p-10
    ">

            <h1 className="
            text-5xl
            font-bold
            mb-12
            text-center
        ">
                PulseForge ⚡ Dashboard
            </h1>

            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                justify-items-center
            "
            >

                {metrics.map(metric => (

                    <DeviceCard

                        key={metric.agent.agentId}

                        metric={metric}

                    />

                ))}

            </div>

            {

                Object.entries(histories).map(

                    ([agentId, history]) => (

                        <MetricsChart

                            key={agentId}

                            data={history}

                        />

                    )

                )

            }

        </div>

    );
}

export default Dashboard;