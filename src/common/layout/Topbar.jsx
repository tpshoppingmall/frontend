import "../../styless/layout/Topbar.css"
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();

  const handleExhibitionClick = () => {
    navigate('/exhibition');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return(
      <div className="topbar">
        <div className="topbar-left">
          <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src="/etreeslogo/logo.png" alt="Logo" className="logo-image"/>
            <h2>trees System</h2>
          </div>
        </div>

        <div className="topbar-center">
          <span className="topbar-nav-link">
            랭킹
          </span>
          <span className="topbar-nav-link">
            브랜드
          </span>
          <span className="topbar-nav-link">
            매거진
          </span>
          <span className="topbar-nav-link" onClick={handleExhibitionClick}>
            기획전
          </span>
          <span className="topbar-nav-link">
            이벤트
          </span>
        </div>
      </div>
  );
};

export default Topbar;
