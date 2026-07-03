interface ProgressBarProps {
    label: string;
    value: number;
}

function ProgressBar({ label, value }: ProgressBarProps) {

    let color = "bg-green-500";

    if (value >= 80) {
        color = "bg-red-500";
    } else if (value >= 60) {
        color = "bg-yellow-500";
    }

    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span>{value.toFixed(1)}%</span>
            </div>

            <div className="w-full h-3 bg-zinc-700 rounded-full overflow-hidden">
                <div
                    className={`${color} h-3 transition-all duration-500`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

export default ProgressBar;