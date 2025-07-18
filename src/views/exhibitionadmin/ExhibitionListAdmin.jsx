import "../../styless/exhibition/ExhibitionAdmin.css"
import ExhibitionSelect from "./ExhibitionSelect";
import {useState} from "react";
import BasicButton from "../../common/button/BasicButton";
import { useNavigate  } from "react-router-dom";

const ExhibitionListAdmin = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const navigate = useNavigate();

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  const handleRegistClick = () => {
    navigate("/exhibition/regist");
  };

  return(
      <div>
        <div className="exhibition-title">
          기획전
        </div>

        <div className="exhibition-actions">
          <BasicButton
              size="medium"
              onClick={handleRegistClick}
          >
            기획전 등록
          </BasicButton>
        </div>

        <ExhibitionSelect
            selectedBrand={selectedBrand}
            selectedTheme={selectedTheme}
            onBrandChange={handleBrandChange}
            onThemeChange={handleThemeChange}
        />

        {/*기획전 리스트 */}
      </div>
  );
};

export default ExhibitionListAdmin;
