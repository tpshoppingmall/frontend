import "../../styless/exhibition/ExhibitionAdmin.css"
import ExhibitionSelect from "../exhibitionadmin/ExhibitionSelect";
import {useState} from "react";

const ExhibitionListAdmin = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  return(
      <div>
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
