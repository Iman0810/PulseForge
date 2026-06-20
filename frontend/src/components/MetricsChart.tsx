import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function MetricsChart({data}:any){


    return (

        <div className="mt-8">


        <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>


        <XAxis dataKey="timestamp"/>

        <YAxis/>


        <Tooltip/>


        <Line
        type="monotone"
        dataKey="cpuUsage"
        />


        <Line
        type="monotone"
        dataKey="ramUsage"
        />


        </LineChart>


        </ResponsiveContainer>


        </div>

    )

}


export default MetricsChart;