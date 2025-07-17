import "../../styless/layout/Topbar.css"

const Topbar = () => {
  return(
      <div className="topbar">
        <div className="topbar-left">
          <div className="logo">
            <img src="/etreeslogo/logo.png" alt="Logo" className="logo-image"/>
            <h2>trees System</h2>
          </div>
        </div>

        <div className="topbar-center">
          <div className="page-title">
            <h1>이트리지 기획전</h1>
          </div>
        </div>
      </div>
  );
};

export default Topbar;
