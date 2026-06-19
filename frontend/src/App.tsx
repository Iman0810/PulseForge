import { useEffect, useState } from "react";
import axios from "axios";


interface Metric {

    id: number;
    agentId: string;
    deviceName: string;
    cpuUsage: number;
    ramUsage: number;
    diskUsage: number;


}



function App() {


    const [metrics, setMetrics] = useState<Metric[]>([]);



    useEffect(() => {


        const fetchMetrics = () => {

            axios.get(
                "http://localhost:8080/api/metrics/latest"
            )

                .then(response => {

                    setMetrics(response.data)

                })

        }



        fetchMetrics();


        const interval = setInterval(
            fetchMetrics,
            5000
        );


        return () => clearInterval(interval);


    }, [])


    return (

        <div>

            <h1>
                OpenMonitor Dashboard
            </h1>


            {
                metrics.map(metric => (

                    <div key={metric.id}>

                        <h3>
                            {metric.deviceName}
                        </h3>


                        <p>
                            CPU: {metric.cpuUsage.toFixed(2)}%
                        </p>


                        <p>
                            RAM: {metric.ramUsage.toFixed(2)}%
                        </p>


                        <p>
                            Disk: {metric.diskUsage.toFixed(2)}%
                        </p>


                        <hr />

                    </div>


                ))

            }


        </div>

    )

}


export default App;