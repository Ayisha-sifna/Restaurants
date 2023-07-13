
import Dashboard from "../components/dashboard";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import '../components/dashboard.css'
import MonthlyScanGraph from "../components/graph";
function Home() {
    return (
        <>
            <Navbar />
            <div class="container-fluid" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                    <Sidebar />
                    <Dashboard />

                </div>
            </div>
            <Footer />


        </>
    );
}

export default Home;
