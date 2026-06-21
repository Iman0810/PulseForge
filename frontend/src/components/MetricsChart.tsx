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

<div className="space-y-10 mt-10">


<Chart
title="CPU Usage"
data={data}
metric="cpuUsage"
/>


<Chart
title="RAM Usage"
data={data}
metric="ramUsage"
/>


<Chart
title="Disk Usage"
data={data}
metric="diskUsage"
/>


</div>

)

}



function Chart({title,data,metric}:any){


return (

<div>

<h2 className="text-xl font-bold mb-4">

{title}

</h2>


<ResponsiveContainer width="100%" height={250}>


<LineChart data={data}>


<XAxis

dataKey="timestamp"

tickFormatter={(value)=>{

return new Date(value)
.toLocaleTimeString();

}}

/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey={metric}

/>


</LineChart>


</ResponsiveContainer>


</div>


)

}


export default MetricsChart;