interface StatCardProps {

    title: string;
    value: string | number;
    color: string;

}

function StatCard({

    title,
    value,
    color

}: StatCardProps) {

    return (

        <div
            className="
                bg-zinc-900
                border
                border-zinc-700
                rounded-xl
                p-6
                shadow-lg
                text-center
            "
        >

            <h2 className="text-zinc-400 text-sm uppercase">

                {title}

            </h2>

            <p className={`text-4xl font-bold mt-3 ${color}`}>

                {value}

            </p>

        </div>

    );

}

export default StatCard;