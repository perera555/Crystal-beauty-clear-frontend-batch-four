import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/product-card"
import Header from "../../components/header" // ✅ import header

export default function ProductsPage() {

    const [productList, setProductList] = useState([])
    const [productsLoaded, setProductsLoaded] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (!productsLoaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
                .then((res) => {
                    setProductList(res.data.products)
                    setProductsLoaded(true)
                })
        }
    }, [productsLoaded])

    function searchProducts() {
        if (search.length > 0) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search)
                .then((res) => {
                    setProductList(res.data.products)
                })
        }
    }

    return (
        <div className="h-full w-full bg-accent/20">

            {/* ✅ HEADER */}
            <Header />

            {/* ✅ CONTENT (add margin-top to avoid overlap) */}
            <div className="p-6 pt-[90px]">

                {/* Search Bar */}
                <div className="w-full h-[60px] flex items-center justify-center gap-4 mb-6">

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        className="w-[320px] h-[40px] border-2 border-primary rounded-lg px-4 outline-none focus:ring-2 focus:ring-primary bg-white shadow-sm"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        className="bg-primary hover:bg-secondary transition-all duration-300 text-white px-5 h-[40px] rounded-lg font-medium shadow-md"
                        onClick={searchProducts}
                    >
                        Search
                    </button>

                    <button
                        className="bg-secondary hover:bg-primary transition-all duration-300 text-white px-5 h-[40px] rounded-lg font-medium shadow-md"
                        onClick={() => setProductsLoaded(false)}
                    >
                        Reset
                    </button>

                </div>

                {/* Products */}
                {
                    productsLoaded ? (
                        <div className="w-full flex flex-wrap justify-center gap-6">
                            {productList.map((product) => (
                                <ProductCard
                                    key={product.productId}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <Loader />
                    )
                }

            </div>
        </div>
    )
}