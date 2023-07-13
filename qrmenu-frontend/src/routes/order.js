import OrderTable from "../components/orderstable";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
function Order() {
    return (
        <>
            <Navbar />
            <div class="row row-offcanvas row-offcanvas-left">
                <Sidebar />
                <OrderTable />
            </div>

            <Footer />

        </>
    );
}

export default Order;
