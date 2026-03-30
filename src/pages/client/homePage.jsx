import { Route, Routes, Link } from "react-router-dom";
import Header from "../../components/header";
import ProductsPage from "./productsPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import ContactPage from "./contactPage";
import AboutPage from "./aboutPage";
import ReviewPage from "./reviewPage";

import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/product-card";
import Loader from "../../components/loader";

export default function HomePage() {

  const [productList, setProductList] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {

    if (!productsLoaded) {

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
        .then((res) => {

          setProductList(res.data.products);
          setProductsLoaded(true);

        })
        .catch(() => {
          console.log("Error loading products");
        });

    }

  }, [productsLoaded]);


  return (

    <div className="w-full min-h-screen bg-white flex flex-col">

      <Header />

      <div className="w-full pt-[70px] flex-grow">

        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={

              <div className="flex flex-col w-full">

                {/* HERO SECTION */}

                <section
                  className="relative py-40 text-center text-white overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80')",
                  }}
                >

                  <div className="absolute inset-0 bg-black/50"></div>

                  <div className="relative z-10 px-6">

                    <h1 className="text-6xl font-[Playfair_Display] mb-6 leading-tight">
                      Reveal Your <span className="text-secondary">Natural Beauty</span>
                    </h1>

                    <p className="text-xl max-w-2xl mx-auto mb-6">
                      Welcome to <b>Crystal Beauty Clear</b> — your destination for premium skincare
                      and luxury cosmetic products.
                    </p>

                    <Link
                      to="/products"
                      className="bg-white text-secondary px-10 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition"
                    >
                      Shop Collection
                    </Link>

                  </div>

                </section>


                {/* FEATURED PRODUCTS */}

                <section className="py-24 bg-white">

                  <h2 className="text-4xl text-secondary text-center font-[Playfair_Display] mb-16">
                    Featured Products
                  </h2>

                  {

                    productsLoaded ?

                      <div className="flex flex-wrap justify-center gap-8">

                        {

                          productList.slice(0, 4).map((product) => (

                            <div
                              key={product._id}
                              className="relative group transform hover:-translate-y-2 transition duration-300"
                            >

                              <ProductCard product={product} />

                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition">

                                <Link
                                  to={"/overview/" + product._id}
                                  className="bg-accent text-secondary px-6 py-2 rounded-full font-semibold"
                                >
                                  Quick View
                                </Link>

                              </div>

                            </div>

                          ))

                        }

                      </div>

                      :

                      <Loader />

                  }

                </section>


                {/* BEAUTY COLLECTION */}

                <section className="py-24 bg-accent">

                  <h2 className="text-4xl text-secondary text-center font-[Playfair_Display] mb-16">
                    Beauty Collections
                  </h2>

                  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">

                    <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
                      <h3 className="text-2xl text-secondary font-semibold">Skincare</h3>
                      <p className="mt-4 text-gray-600">
                        Advanced skincare products formulated to nourish and protect your skin.
                      </p>
                    </div>

                    <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
                      <h3 className="text-2xl text-secondary font-semibold">Makeup</h3>
                      <p className="mt-4 text-gray-600">
                        High-quality makeup designed to highlight your natural beauty.
                      </p>
                    </div>

                    <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
                      <h3 className="text-2xl text-secondary font-semibold">Beauty Tools</h3>
                      <p className="mt-4 text-gray-600">
                        Professional tools crafted to deliver flawless results.
                      </p>
                    </div>

                  </div>

                </section>


                {/* INSTAGRAM */}

                <section className="py-24 bg-accent text-center">

                  <h2 className="text-4xl text-secondary font-[Playfair_Display] mb-6">
                    Follow Us On Instagram
                  </h2>

                  <p className="text-gray-600 mb-16">
                    See how our community uses Crystal Beauty Clear products.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-6">

                    <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348" className="h-40 w-full object-cover rounded-lg" />

                    <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" className="h-40 w-full object-cover rounded-lg" />

                    <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9" className="h-40 w-full object-cover rounded-lg" />

                    <img src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273" className="h-40 w-full object-cover rounded-lg" />

                  </div>

                </section>


                {/* FOOTER */}

                <footer className="bg-secondary text-white pt-16 pb-8 px-6">

                  <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

                    <div>
                      <h2 className="text-2xl font-[Playfair_Display] mb-4">
                        Crystal Beauty Clear
                      </h2>
                      <p className="text-gray-300">
                        Premium skincare and cosmetic products designed to enhance your natural beauty.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>Shipping Policy</li>
                        <li>Returns</li>
                        <li>Privacy Policy</li>
                        <li>Terms</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Contact</h3>
                      <p className="text-gray-300">📍 Maharagama, Sri Lanka</p>
                      <p className="text-gray-300">📧 support@crystalbeauty.com</p>
                      <p className="text-gray-300">📞 +94 77 123 4567</p>
                    </div>

                  </div>

                  <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
                    © {new Date().getFullYear()} Crystal Beauty Clear
                  </div>

                </footer>

              </div>

            }
          />

          {/* OTHER PAGES (UNCHANGED ROUTERS) */}

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/overview/:id" element={<ProductOverview />} />
          <Route path="/reviews/:id" element={<ReviewPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="*" element={<h1 className="text-center mt-10 text-3xl">404 Not Found</h1>} />

        </Routes>

      </div>

    </div>

  );

}