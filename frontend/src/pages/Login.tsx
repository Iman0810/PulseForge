import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    const handleLogin = async (
        event: React.FormEvent
    ) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/auth/login",
                {
                    username,
                    password
                }
            );

            const token = response.data.token;

            localStorage.setItem(
                "token",
                token
            );

            navigate("/");

        } catch (err) {

            console.error(
                "Login failed:",
                err
            );

            setError(
                "Invalid username or password"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="
            min-h-screen
            bg-black
            text-white
            flex
            items-center
            justify-center
            p-6
        ">

            <div className="
                w-full
                max-w-md
                bg-zinc-900
                border
                border-zinc-700
                rounded-2xl
                p-8
                shadow-2xl
            ">

                <div className="text-center mb-8">

                    <h1 className="
                        text-4xl
                        font-bold
                    ">
                        PulseForge ⚡
                    </h1>

                    <p className="
                        text-zinc-400
                        mt-2
                    ">
                        Sign in to your dashboard
                    </p>

                </div>


                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <div>

                        <label className="
                            block
                            text-sm
                            text-zinc-400
                            mb-2
                        ">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(
                                    event.target.value
                                )
                            }
                            className="
                                w-full
                                bg-black
                                border
                                border-zinc-700
                                rounded-lg
                                px-4
                                py-3
                                text-white
                                outline-none
                                focus:border-cyan-400
                            "
                            placeholder="Enter username"
                        />

                    </div>


                    <div>

                        <label className="
                            block
                            text-sm
                            text-zinc-400
                            mb-2
                        ">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            className="
                                w-full
                                bg-black
                                border
                                border-zinc-700
                                rounded-lg
                                px-4
                                py-3
                                text-white
                                outline-none
                                focus:border-cyan-400
                            "
                            placeholder="Enter password"
                        />

                    </div>


                    {error && (

                        <p className="
                            text-red-400
                            text-sm
                        ">
                            {error}
                        </p>

                    )}


                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-cyan-500
                            hover:bg-cyan-400
                            disabled:bg-zinc-700
                            text-black
                            font-bold
                            py-3
                            rounded-lg
                            transition
                        "
                    >

                        {loading
                            ? "Signing in..."
                            : "Sign In"
                        }

                    </button>

                </form>

            </div>

        </div>

    );
}

export default Login;