import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const Layout = ({children}) => {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;