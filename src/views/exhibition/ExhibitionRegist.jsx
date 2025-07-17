import React, { useState } from 'react';
import BasicButton from "../../common/button/BasicButton";
import "../../styless/exhibition/ExhibitionRegist.css";

const ExhibitionRegist = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    theme: '',
    image: null,
    startDate: '',
    discountRate: '',
    isActive: false
  });

  const brands = ['Special', '10 Corso Como', '8 seconds', 'AMI', 'ANOTHER SHOP', 'Alice + Olivia', 'BEAKER', 'BEANPOLE'];
  const themes = ['NEW ARRIVALS', 'SALES', 'REVIEWS', 'POP-UP STORE', '기타 테마'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = () => {
    console.log('기획전 등록 데이터:', formData);
  };

  return (
      <div className="exhibition-regist">
        <h2 className="regist-title">기획전 등록</h2>

        <div className="regist-form">
          <div className="form-row">
            <label className="form-label">기획전명</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
            />
          </div>

          <div className="form-row">
            <label className="form-label">기획전브랜드</label>
            <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="form-select"
            >
              <option value="">BEAKER</option>
              {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">기획전테마</label>
            <select
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                className="form-select"
            >
              <option value="">NEW ARRIVAL</option>
              {themes.map((theme, index) => (
                  <option key={index} value={theme}>
                    {theme}
                  </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">기획전이미지</label>
            <div className="image-upload-container">
              <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-input"
                  id="image-upload"
              />
              <label htmlFor="image-upload" className="image-upload-label">
                파일선택
              </label>
              {formData.image && (
                  <span className="image-name">{formData.image.name}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">기획전전시기간</label>
            <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="form-input date-input"
            />
          </div>

          <div className="form-row">
            <label className="form-label">상품할인율</label>
            <div className="discount-container">
              <input
                  type="text"
                  name="discountRate"
                  className="discount-input"
              />
              <span className="discount-unit">%</span>
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">기획전전시여부</label>
            <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="form-checkbox"
            />
          </div>
        </div>

        <div className="regist-actions">
          <BasicButton
              size="medium"
              onClick={handleSubmit}
          >
            저장
          </BasicButton>
        </div>
      </div>
  );
};

export default ExhibitionRegist;
