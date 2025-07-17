import React from 'react';
import "../../styless/exhibition/ExhibitionSelect.css";

const ExhibitionSelect = ({ selectedBrand, selectedTheme, onBrandChange, onThemeChange }) => {
  const brands = ['모든 브랜드', 'Special', '10 Corso Como', '8 seconds', 'AMI', 'ANOTHER SHOP', 'Alice + Olivia', "BEAKER", "BEANPOLE"];
  const themes = ['모든 테마', 'NEW ARRIVALS', 'SALES', 'REVIEWS', 'POP-UP STORE', '기타 테마'];

  return (
      <div className="exhibition-select-container">
        <select
            value={selectedBrand}
            onChange={onBrandChange}
            className="exhibition-select"
        >
          {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
          ))}
        </select>

        <select
            value={selectedTheme}
            onChange={onThemeChange}
            className="exhibition-select"
        >
          {themes.map((theme, index) => (
              <option key={index} value={theme}>
                {theme}
              </option>
          ))}
        </select>
      </div>
  );
};

export default ExhibitionSelect;
