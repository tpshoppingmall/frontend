import React, { useState } from 'react';
import BasicButton from "../../common/button/BasicButton";
import "../../styless/exhibition/ExhibitionRegist.css";
import { exhibitionService } from "../../services/exhibitionService";

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

  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const submitData = {
        name: formData.name,
        brand: formData.brand,
        theme: formData.theme,
        startDate: formData.startDate,
        discountRate: formData.discountRate,
        isActive: formData.isActive
      };

      console.log('전송할 데이터:', submitData);

      const response = await exhibitionService.createExhibition(submitData);

      console.log('API 응답:', response);
      alert('기획전이 성공적으로 등록되었습니다!');

    } catch (error) {
      console.error('등록 실패:', error);

      // axios 에러 처리
      if (error.response) {
        console.error('서버 응답 에러:', error.response.data);
        alert(`등록 실패: ${error.response.data.message || '서버 오류'}`);
      } else if (error.request) {
        console.error('요청 에러:', error.request);
        alert('서버에 연결할 수 없습니다.');
      } else {
        alert('기획전 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
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
              {formData.image ? (
                  <span className="image-name">{formData.image.name}</span>
              ) : (
                  <span className={`image-name ${!formData.image ? 'no-file' : ''}`}>
                    {formData.image ? formData.image.name : '선택된 파일이 없습니다'}
                  </span>
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
                  value={formData.discountRate}
                  onChange={handleInputChange}
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
              disabled={isLoading}
          >
            {isLoading ? '저장 중...' : '저장'}
          </BasicButton>
        </div>
      </div>
  );
};

export default ExhibitionRegist;
