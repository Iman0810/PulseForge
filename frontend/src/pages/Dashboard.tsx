import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function Dashboard() {
    const [metrics, setMetrics] = useState<any[]>([]);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");

        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        });

        client.onConnect = () => {
            client.subscribe("/topic/metrics", (message) => {
                const newMetric = JSON.parse(message.body);

                setMetrics((prev) => {
                    const updated = [newMetric, ...prev];

                    if (updated.length > 20) {
                        updated.pop();
                    }

                    return updated;
                });
            });
        };

        client.activate();

        return () => {
            client.deactivate();
        };
    }, []);

    return (
        <div className="p-10 text-white bg-black min-h-screen">
            <h1 className="text-4xl font-bold mb-10">
                PulseForge ⚡ Live Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">
                {metrics.map((m) => (
                    <div key={m.id} className="p-4 bg-zinc-900 rounded">
                        <h2>{m.deviceName}</h2>
                        <p>CPU: {m.cpuUsage}</p>
                        <p>RAM: {m.ramUsage}</p>
                        <p>Disk: {m.diskUsage}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;