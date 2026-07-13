import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/api";
import { setToken } from "../utils/auth";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await api.post("/auth/register", form);

            setToken(res.data.token);

            localStorage.setItem("name", res.data.user.name);

            localStorage.setItem("email", res.data.user.email);

            toast.success("Registration Successful 🎉");

            navigate("/");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
            >

                <h1 className="text-3xl font-bold text-center mb-6">

                    Create Account

                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                >

                    {
                        loading
                            ? "Creating Account..."
                            : "Register"
                    }

                </button>

                <p className="text-center mt-5">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-blue-600 ml-2 font-semibold"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Register;