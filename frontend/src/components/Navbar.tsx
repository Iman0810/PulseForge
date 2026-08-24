import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");


    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };


    return (

        <nav className="
            bg-zinc-900
            border-b
            border-zinc-700
            px-6
            py-4
            flex
            justify-between
            items-center
            text-zinc-300
        ">

            <Link
                to="/"
                className="text-xl font-bold"
            >
                PulseForge ⚡
            </Link>


            {token && (

                <button
                    onClick={handleLogout}
                    className="
                        bg-red-500/20
                        text-red-400
                        border
                        border-red-500/30
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-red-500/30
                        transition
                    "
                >
                    Logout
                </button>

            )}

        </nav>

    );
}

export default Navbar;