import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import UserData from "./userData";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    return (

        <header className="fixed top-0 z-50 h-[70px] w-full flex items-center justify-between px-4 bg-primary text-white shadow-md">

            {/* LEFT - Hamburger + Logo */}
            <div className="flex items-center gap-3">

                <button
                    className="lg:hidden text-3xl"
                    onClick={() => setIsOpen(true)}
                >
                    <RxHamburgerMenu />
                </button>

                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="Crystal Beauty Clear"
                        className="h-[40px]"
                    />
                    <span className="hidden md:block text-lg font-semibold">
                        Crystal Beauty Clear
                    </span>
                </Link>

            </div>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex gap-8 font-medium">
                <Link to="/" className="hover:text-accent">Home</Link>
                <Link to="/products" className="hover:text-accent">Products</Link>
                <Link to="/about" className="hover:text-accent">About</Link>
                <Link to="/contact" className="hover:text-accent">Contact</Link>
                <Link to="/reviews" className="hover:text-accent">Reviews</Link>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-5">
                <UserData />

                <Link to="/cart" className="text-2xl hover:text-accent">
                    <BsCart4 />
                </Link>
            </div>

            {/* OVERLAY */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* MOBILE SIDEBAR */}
            <div className={`fixed top-0 left-0 h-full w-[260px] bg-white text-secondary z-50 p-6 flex flex-col
                transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

                <button
                    className="text-lg mb-6 text-left"
                    onClick={() => setIsOpen(false)}
                >
                    ✕ Close
                </button>

                {/* MENU LINKS */}
                <Link to="/" onClick={() => setIsOpen(false)}
                    className="py-3 px-3 rounded-md transition duration-200 hover:bg-primary hover:text-white">
                    Home
                </Link>

                <Link to="/products" onClick={() => setIsOpen(false)}
                    className="py-3 px-3 rounded-md transition duration-200 hover:bg-primary hover:text-white">
                    Products
                </Link>

                <Link to="/about" onClick={() => setIsOpen(false)}
                    className="py-3 px-3 rounded-md transition duration-200 hover:bg-primary hover:text-white">
                    About
                </Link>

                <Link to="/contact" onClick={() => setIsOpen(false)}
                    className="py-3 px-3 rounded-md transition duration-200 hover:bg-primary hover:text-white">
                    Contact
                </Link>

                <Link to="/reviews" onClick={() => setIsOpen(false)}
                    className="py-3 px-3 rounded-md transition duration-200 hover:bg-primary hover:text-white">
                    Reviews
                </Link>

                <Link to="/cart" onClick={() => setIsOpen(false)}
                    className="py-3 px-3 rounded-md transition duration-200 hover:bg-primary hover:text-white">
                    Cart
                </Link>

                {/* ✅ USER SECTION (LOGOUT FIX) */}
                <div className="mt-6 border-t pt-4">
                    <UserData />
                </div>

            </div>

        </header>
    );
}