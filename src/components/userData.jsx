import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserData() {

    const [user, setUser] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {

        // do not call API if token not available
        if (!token) {
            setUser(null);
            return;
        }

        const fetchUser = async () => {

            try {

                const response = await axios.get(
                    import.meta.env.VITE_BACKEND_URL + "/api/user/current",
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }
                );

                if (response.data && response.data.user) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }

            } catch (error) {

                // token invalid or route not found
                console.log("User fetch failed");

                localStorage.removeItem("token");
                setUser(null);

            }

        };

        fetchUser();

    }, [token]);


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

                <div className="h-full flex items-center gap-3">

                    <span className="text-sm font-medium">
                        {user.name}
                    </span>

                    <button
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={() => {

                            localStorage.removeItem("token");

                            setUser(null);

                            window.location.href = "/login";

                        }}
                    >
                        Logout
                    </button>

                </div>

            )}

        </div>

    );

}