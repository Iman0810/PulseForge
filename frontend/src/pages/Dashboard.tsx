import { useEffect, useState } from "react";
import api from "../services/api";
import DeviceCard from "../components/DeviceCard";
import MetricsChart from "../components/MetricsChart";


function Dashboard() {


    const [metrics, setMetrics] = useState([]);



    useEffect(() => {


        const fetchData = () => {


            api.get("/metrics/latest")
                .then(res => {

                    setMetrics(res.data);

                });


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
                OpenMonitor Dashboard
            </h1>

            <div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
justify-items-center
">
                {

                    metrics.map((metric: any) => (

                        <DeviceCard
                            key={metric.agentId}
                            metric={metric}
                        />

                    ))

                }

            </div>

       <MetricsChart data={metrics}/>     
            </div>
            
       
    );
}

export default Dashboard;