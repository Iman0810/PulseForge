import { useEffect, useState } from "react";
import api from "../services/api";
import DeviceCard from "../components/DeviceCard";
import MetricsChart from "../components/MetricsChart";


function Dashboard() {

    const [metrics, setMetrics] = useState<any[]>([]);
    const [history, setHistory] = useState<any[]>([]);


    useEffect(() => {


        const fetchData = async () => {

            try {

                const latest = await api.get("/metrics/latest");

                setMetrics(latest.data);


                if (latest.data.length > 0) {


                    const agentId = latest.data[0]?.agent?.agentId;


                    if (!agentId) {

                        console.log(
                            "missing agentID",
                            latest.data[0]
                        );

                        return;
                    }


                    const historyData = await api.get(
                        `/metrics/history/${agentId}`
                    );


                    setHistory(historyData.data);

                }


            } catch(error) {

                console.log(error);

            }

        }


        fetchData();


        const interval = setInterval(fetchData, 5000);


        return () => clearInterval(interval);


    }, [])



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
                Open Monitor Dashboard
            </h1>


            <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            justify-items-center
            ">


                {
                    metrics.map((metric:any)=>(

                        <DeviceCard
                            key={metric.id}
                            metric={metric}
                        />

                    ))
                }


            </div>


            <MetricsChart data={history}/>


        </div>

    );

}


export default Dashboard;