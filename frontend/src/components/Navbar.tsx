import { NavLink } from "react-router-dom";

function Navbar() {

    return (

        <nav className="
            bg-zinc-950
            border-b
            border-zinc-800
            px-8
            py-4
        ">

            <div className="
                max-w-7xl
                mx-auto
                flex
                items-center
                justify-between
            ">

                {/* Logo */}

                <NavLink
                    to="/"
                    className="text-2xl font-bold text-white"
                >
                    PulseForge ⚡
                </NavLink>


                {/* Navigation */}

                <div className="flex items-center gap-6">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `transition-colors ${
                                isActive
                                    ? "text-white font-semibold"
                                    : "text-zinc-400 hover:text-white"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;