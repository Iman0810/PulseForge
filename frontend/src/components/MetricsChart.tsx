import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from "recharts";

interface Props {
    data: any[];
}

function MetricsChart({ data }: Props) {

    return (

        <div className="mt-12">

            <h2 className="text-3xl font-bold mb-8">
                Live System Metrics
            </h2>

            <ResponsiveContainer width="100%" height={420}>

                <LineChart data={data}>

                    <CartesianGrid
                        stroke="#333"
                        strokeDasharray="4 4"
                    />

                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={(value) =>
                            new Date(value).toLocaleTimeString()
                        }
                    />

                    <YAxis
                        domain={[0, 100]}
                    />

                    <Tooltip
                        labelFormatter={(value) =>
                            new Date(value).toLocaleTimeString()
                        }
                    />

                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="cpuUsage"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={false}
                        name="CPU"
                    />

                    <Line
                        type="monotone"
                        dataKey="ramUsage"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={false}
                        name="RAM"
                    />

                    <Line
                        type="monotone"
                        dataKey="diskUsage"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        dot={false}
                        name="Disk"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default MetricsChart;