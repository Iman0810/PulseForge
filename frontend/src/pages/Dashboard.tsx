import { useEffect, useState } from "react";



function Dashboard() {
    const [metrics, setMetrics] = useState<any[]>([]);

    useEffect(() => {

        const socket = new WebSocket("ws://localhost:8080/ws");

        socket.onopen = () => {
            console.log("Connected");
        };

        socket.onmessage = (event) => {

            const metric = JSON.parse(event.data);

            setMetrics(prev => {

                const updated = [metric, ...prev];

                return updated.slice(0, 10);

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