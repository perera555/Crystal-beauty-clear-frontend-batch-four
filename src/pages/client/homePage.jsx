import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ProductsPage from "./productsPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";


export default function HomePage() {
    return(
        <div className="w-full h-screen ">
          <Header/>
          <div className="w-full h-[calc(100vh-70px)]  min-h-[calc(100vh-70px)] ">
            <Routes path="/">
            <Route path="/" element={<h1>HomePage</h1>}/>
             <Route path="/products" element={<ProductsPage/>}/>
              <Route path="/about" element={<h1>AboutPAge</h1>}/>
               <Route path="/contact" element={<h1>ContactPage</h1>}/>
                 <Route path="/overview/:id" element={<ProductOverview/>}/>
                 <Route path="/cart" element={<CartPage/>}/>
                 <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/reviews" element={<h1>REVIEWS</h1>}/>
               <Route path="/*" element={<h1>404 Not Found</h1>}/>

            </Routes>



          </div>
        </div>
    )
}