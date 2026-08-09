import { useParams } from "react-router-dom";

function DeviceDetails() {

    const { agentId } = useParams();

    return (

        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-4xl font-bold mb-6">
                Device Details
            </h1>

            <p className="text-zinc-400">
                Agent ID:
            </p>

            <p className="text-cyan-400 font-mono">
                {agentId}
            </p>

        </div>

    );

}

export default DeviceDetails;