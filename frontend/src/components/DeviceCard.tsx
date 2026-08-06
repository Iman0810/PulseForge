import ProgressBar from "./ProgressBar";
import StatCard from "./StatCard";

interface Metric {
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

function getLastSeen(lastSeen: string): string {

    const seconds = Math.floor(
        (Date.now() - new Date(lastSeen).getTime()) / 1000
    );

    if (seconds < 60) {
        return `${seconds} sec ago`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hr ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days} day${days > 1 ? "s" : ""} ago`;
}

function formatUptime(seconds: number): string {

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) {
        return `${days}d ${hours}h`;
    }

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
}

function getAlerts(metric: Metric): string[] {

    const alerts: string[] = [];

    if (metric.cpuUsage >= 90) {
        alerts.push("🚨 Critical CPU Usage");
    } else if (metric.cpuUsage >= 70) {
        alerts.push("⚠ High CPU Usage");
    }

    if (metric.ramUsage >= 90) {
        alerts.push("🚨 Critical RAM Usage");
    } else if (metric.ramUsage >= 75) {
        alerts.push("⚠ High RAM Usage");
    }

    if (metric.diskUsage >= 95) {
        alerts.push("🚨 Critical Disk Usage");
    } else if (metric.diskUsage >= 80) {
        alerts.push("⚠ High Disk Usage");
    }

    return alerts;
}

function DeviceCard({ metric }: { metric: Metric }) {

    const alerts = getAlerts(metric);

    

    return (

        <div className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            p-6
            w-80
            shadow-lg
            hover:shadow-2xl
            transition-all
            duration-300
        ">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-bold">
                    🖥️ {metric.deviceName}
                </h2>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        metric.agent.status === "ONLINE"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                    }`}
                >
                    {metric.agent.status}
                </span>

            </div>

            <div className="text-sm text-zinc-400 mb-5 space-y-1">

                <p><strong>OS:</strong> {metric.os}</p>

                <p><strong>Architecture:</strong> {metric.architecture}</p>

                <p><strong>Kernel:</strong> {metric.kernel}</p>

                <p><strong>Uptime:</strong> {formatUptime(metric.uptime)}</p>

            </div>

            <div className="space-y-5">

                <ProgressBar
                    label="CPU"
                    value={metric.cpuUsage}
                />

                <ProgressBar
                    label="RAM"
                    value={metric.ramUsage}
                />

                <ProgressBar
                    label="Disk"
                    value={metric.diskUsage}
                />

            </div>

            <div className="mt-6 pt-4 border-t border-zinc-700">

                <p className="text-sm text-zinc-400">
                    Last seen
                </p>

                <p className="text-white font-medium">
                    {getLastSeen(metric.lastSeen)}
                </p>

            </div>

            {
                alerts.length > 0 && (

                    <div className="mt-5 pt-4 border-t border-red-600">

                        <h3 className="text-red-400 font-semibold mb-2">

                            Alerts

                        </h3>

                        {
                            alerts.map((alert, index) => (

                                <p
                                    key={index}
                                    className="text-sm text-red-300"
                                >
                                    {alert}
                                </p>

                            ))
                        }

                    </div>

                )
            }

        </div>

    );
}

export default DeviceCard;