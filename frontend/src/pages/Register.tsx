import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);


    const handleRegister = async (
        event: React.FormEvent
    ) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        if (password !== confirmPassword) {

            setError("Passwords do not match");

            return;
        }


        setLoading(true);


        try {

            await api.post(
                "/auth/register",
                {
                    username,
                    password
                }
            );


            setSuccess(
                "Registration successful! Redirecting to login..."
            );


            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (err: any) {

            console.error(
                "Registration failed:",
                err
            );


            if (err.response?.data) {

                setError(
                    typeof err.response.data === "string"
                        ? err.response.data
                        : "Registration failed"
                );

            } else {

                setError(
                    "Registration failed. Please try again."
                );

            }

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
                        Create your account
                    </p>

                </div>


                <form
                    onSubmit={handleRegister}
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
                            required
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
                            placeholder="Choose a username"
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
                            required
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
                            placeholder="At least 6 characters"
                        />

                    </div>


                    <div>

                        <label className="
                            block
                            text-sm
                            text-zinc-400
                            mb-2
                        ">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            required
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
                            placeholder="Repeat your password"
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


                    {success && (

                        <p className="
                            text-green-400
                            text-sm
                        ">
                            {success}
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
                            ? "Creating account..."
                            : "Create Account"
                        }

                    </button>


                </form>


                <div className="
                    text-center
                    mt-6
                    text-sm
                    text-zinc-400
                ">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="
                            text-cyan-400
                            hover:text-cyan-300
                        "
                    >
                        Sign in
                    </Link>

                </div>


            </div>

        </div>

    );
}

export default Register;