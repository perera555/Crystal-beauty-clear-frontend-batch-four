import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

export default function Header() {
    return (
        <header className="h-[70px] w-full flex justify-center items-center bg-gray-100 relative ">
            <div className="w-[500px] h-full flex items-center justify-evenly text-pink-400 text-xl">
                <Link to="/">HOME</Link>
                <Link to="/products">PRODUCTS</Link>
                <Link to="/about">ABOUT</Link>
                <Link to="/contact">CONTACT</Link>
                <Link to="/reviews">REVIEWS</Link>
                <Link to="/cart" className="absolute right-[30px] text-3xl"><BsCart4 /></Link>


            </div>


        </header>
    )
}