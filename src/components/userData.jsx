import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {

        if (token != null) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((response) => {
                console.log("API Response:", response.data);
                setUser(response.data.user);
            }).catch((e) => {
                console.log("Error:", e);
                setUser(null);
            });
        }

    }, []);

    return (
        <div className="flex items-center gap-3">
            {user == null ? (
                <>
                    <Link
                        to="/login"
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-3 py-1 text-sm border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
                    >
                        Register
                    </Link>
                </>
            ) : (
                <div className="h-full flex justify-center items-center flex-row gap-3">
                    <span className="text-sm font-medium">
                        {user.name}
                    </span>

                    <button
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={() => {
                            localStorage.removeItem("token");
                            setUser(null);
                            window.location = "/login";
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}