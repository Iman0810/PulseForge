import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="
            bg-zinc-950
            border-b
            border-zinc-800
            px-8
            py-4
            flex
            items-center
            justify-between
        ">

            {/* Logo */}

            <Link
                to="/"
                className="
                    text-xl
                    font-bold
                    text-white
                    hover:text-cyan-400
                    transition
                "
            >
                PulseForge ⚡
            </Link>


            {/* Navigation */}

            <div className="flex items-center gap-6">

                <Link
                    to="/"
                    className="
                        text-zinc-300
                        hover:text-white
                        transition
                    "
                >
                    Dashboard
                </Link>

            </div>

        </nav>

    );

}

export default Navbar;