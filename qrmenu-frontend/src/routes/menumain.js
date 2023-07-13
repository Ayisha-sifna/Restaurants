
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ParentMenu from "../components/menuparent";
import Sidebar from "../components/sidebar";
function Menu() {
    return (
        <>
            <Navbar />
            <div class="row row-offcanvas row-offcanvas-left">
                <Sidebar />
                <ParentMenu />
            </div>

            <Footer />

        </>
    );
}

export default Menu;
