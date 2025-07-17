import Topbar from "./Topbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
      <div className="main-layout">
        <Topbar />
        <div className="layout-body">
          <div className="content-area">
            <main className="main-content">
              {children}
            </main>
          </div>
        </div>
        <Footer />
      </div>
  );
};

export default MainLayout;
