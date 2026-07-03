import ProgressBar from "./ProgressBar";

interface Metric {
    deviceName: string;
    cpuUsage: number;
    ramUsage: number;
    diskUsage: number;
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

function DeviceCard({ metric }: { metric: Metric }) {

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

        </div>

    );
}

export default DeviceCard;