import { Form } from "react-router-dom";
import Navbar from "../components/navbar";
import RestaurantForm from "../components/restaurantform";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";


function Restaurant() {
    return (
        <>
            <Navbar />
            <div class="row row-offcanvas row-offcanvas-left">
                <Sidebar />
                <RestaurantForm />
            </div>
            <Footer />
        </>
    );
}

export default Restaurant;
