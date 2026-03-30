import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"

export default function DashboardPage() {

    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)

    const [stats, setStats] = useState({
        totalProducts: 0,
        totalStock: 0,
        totalValue: 0,
        avgPrice: 0,
        lowStock: 0
    })

    const [topProducts, setTopProducts] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
            .then((res) => {
                const data = res.data.products
                setProducts(data)
                calculateStats(data)
                getTopProducts(data)
                setLoaded(true)
            })
    }, [])

    function calculateStats(data) {
        let totalProducts = data.length
        let totalStock = 0
        let totalValue = 0
        let lowStock = 0

        data.forEach((p) => {
            const stock = p.stock || 0
            const price = p.price || 0

            totalStock += stock
            totalValue += price * stock

            if (stock <= 5) lowStock++
        })

        let avgPrice = totalStock > 0 ? totalValue / totalStock : 0

        setStats({
            totalProducts,
            totalStock,
            totalValue,
            avgPrice: avgPrice.toFixed(2),
            lowStock
        })
    }

    function getTopProducts(data) {
        const sorted = [...data].sort((a, b) => b.price - a.price)
        setTopProducts(sorted.slice(0, 5))
    }

    if (!loaded) return <Loader />

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <h1 className="text-2xl font-bold mb-6">📊 Business Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8">

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <p className="text-gray-500">Products</p>
                    <h2 className="text-2xl font-bold">{stats.totalProducts}</h2>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <p className="text-gray-500">Stock</p>
                    <h2 className="text-2xl font-bold">{stats.totalStock}</h2>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <p className="text-gray-500">Stock Value</p>
                    <h2 className="text-2xl font-bold">Rs. {stats.totalValue}</h2>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <p className="text-gray-500">Avg Price</p>
                    <h2 className="text-2xl font-bold">Rs. {stats.avgPrice}</h2>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition border-l-4 border-red-500">
                    <p className="text-gray-500">Low Stock</p>
                    <h2 className="text-2xl font-bold text-red-500">{stats.lowStock}</h2>
                </div>

            </div>

            {/* Content Section */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Recent Products */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-lg font-semibold mb-4">🆕 Recent Products</h2>

                    <div className="space-y-3">
                        {products.slice(0, 5).map((p) => (
                            <div key={p.productId} className="flex justify-between border-b pb-2">
                                <span>{p.name}</span>
                                <span className="font-medium">Rs. {p.price}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Expensive Products */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-lg font-semibold mb-4">💎 Top Expensive</h2>

                    <div className="space-y-3">
                        {topProducts.map((p) => (
                            <div key={p.productId} className="flex justify-between border-b pb-2">
                                <span>{p.name}</span>
                                <span className="font-medium text-green-600">Rs. {p.price}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}