import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const loginWithGoogle = useGoogleLogin({
        onSuccess: (res) => {

            setLoading(true);

            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
                accessToken: res.access_token
            })
            .then((response) => {

                toast.success("Login successful");

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                const user = response.data.user;

                if (user.role === "admin") {
                    navigate("/admin/products");
                } else {
                    navigate("/");
                }

                setLoading(false);

            })
            .catch(() => {
                toast.error("Google login failed");
                setLoading(false);
            });

        }
    });


    function handleLogin() {

        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
            email: email,
            password: password
        })
        .then(response => {

            toast.success("Login successful");

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            const user = response.data.user;

            if (user.role === "admin") {
                navigate("/admin/products");
            } else {
                navigate("/");
            }

            setLoading(false);

        })
        .catch(error => {

            toast.error(error.response?.data?.message || "Login failed");
            setLoading(false);

        });
    }

    return (
        <div className="w-full h-screen bg-[url(/login4.jpg)] bg-cover bg-center flex">

            <div className="border w-[50%] h-full"></div>

            <div className="border w-[50%] h-full flex justify-center items-center">

                <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="email"
                        placeholder="email"
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="password"
                        placeholder="password"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-[400px] h-[50px] bg-green-500 rounded-xl text-white cursor-pointer"
                    >
                        {loading ? "Loading..." : "LOGIN"}
                    </button>

                    <button
                        className="w-[400px] h-[50px] bg-green-500 mt-[20px] rounded-xl text-white cursor-pointer flex justify-center items-center"
                        onClick={loginWithGoogle}
                    >
                        <GrGoogle className="mr-[10px]" />
                        {loading ? "Loading..." : "Login With Google"}
                    </button>

                    <p className="text-sm mt-4 text-gray-600">
                        Don't have an account?{" "}
                        <span className="text-green-500 cursor-pointer">
                            <Link to={"/register"}>Register Now</Link>
                        </span>
                    </p>
                     <p className="text-sm mt-4 text-gray-600">
                        Forget Your Password?{" "}
                        <span className="text-green-500 cursor-pointer">
                            <Link to={"/forget"}>Reset Password</Link>
                        </span>
                    </p>



                </div>

            </div>

        </div>
    );
}