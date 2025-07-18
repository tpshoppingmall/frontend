import React, { useState } from 'react';
import BasicButton from "../../common/button/BasicButton";
import "../../styless/exhibition/ExhibitionRegist.css";
import { exhibitionService } from "../../services/exhibitionService";
import {useNavigate} from "react-router-dom";

const ExhibitionRegist = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    theme: '',
    image: '',
    startDate: '',
    discountRate: '',
    isActive: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const brands = ['Special', '10 Corso Como', '8 seconds', 'AMI', 'ANOTHER SHOP', 'Alice + Olivia', 'BEAKER', 'BEANPOLE'];
  const themes = ['NEW ARRIVALS', 'SALES', 'REVIEWS', 'POP-UP STORE', '기타 테마'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const submitData = {
        exhibitionName: formData.name,
        exhibitionBrand: formData.brand,
        exhibitionTime: formData.theme,
        exhibitionImage: formData.image,
        exhibitionPeriod: formData.startDate,
        saleStatus: formData.discountRate
      };

      console.log('전송할 데이터:', submitData);

      const response = await exhibitionService.createExhibition(submitData);

      console.log('API 응답:', response);

      if (response.success) {
        alert('기획전이 성공적으로 등록되었습니다!');
        navigate("/exhibition/admin")
        setFormData({
          name: '',
          brand: '',
          theme: '',
          image: '',
          startDate: '',
          discountRate: '',
          isActive: false
        });
      } else {
        alert(`등록 실패: ${response.message || '알 수 없는 오류'}`);
      }

    } catch (error) {
      console.error('등록 실패:', error);

      if (error.response) {
        console.error('서버 응답 에러:', error.response.data);
        const errorMessage = error.response.data.message || '서버 오류가 발생했습니다.';
        alert(`등록 실패: ${errorMessage}`);
      } else if (error.request) {
        console.error('요청 에러:', error.request);
        alert('서버에 연결할 수 없습니다. 네트워크를 확인해주세요.');
      } else {
        alert('기획전 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      brand: '',
      theme: '',
      image: '',
      startDate: '',
      discountRate: '',
      isActive: false
    });
  };

  return (
      <div className="exhibition-regist">
        <h2 className="regist-title">기획전 등록</h2>

        <div className="regist-form">
          <div className="form-row">
            <label className="form-label">기획전명 *</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="기획전명을 입력하세요"
                required
            />
          </div>

          <div className="form-row">
            <label className="form-label">기획전브랜드 *</label>
            <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="form-select"
                required
            >
              <option value="">브랜드를 선택하세요</option>
              {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">기획전테마 *</label>
            <select
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                className="form-select"
                required
            >
              <option value="">테마를 선택하세요</option>
              {themes.map((theme, index) => (
                  <option key={index} value={theme}>
                    {theme}
                  </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">기획전이미지</label>
            <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="form-input"
                placeholder="이미지 URL 또는 경로를 입력하세요"
            />
          </div>

          <div className="form-row">
            <label className="form-label">기획전전시기간 *</label>
            <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="form-input date-input"
                required
            />
          </div>

          <div className="form-row">
            <label className="form-label">상품할인율</label>
            <div className="discount-container">
              <input
                  type="number"
                  name="discountRate"
                  value={formData.discountRate}
                  onChange={handleInputChange}
                  className="discount-input"
                  min="0"
                  max="100"
                  placeholder="0"
              />
              <span className="discount-unit">%</span>
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">기획전전시여부</label>
            <label className="checkbox-container">
              <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="form-checkbox"
              />
              <span className="checkbox-text"></span>
            </label>
          </div>
        </div>

        <div className="regist-actions">
          <BasicButton
              size="medium"
              onClick={handleCancel}
              className="cancel-button"
          >
            취소
          </BasicButton>
          <BasicButton
              size="medium"
              onClick={handleSubmit}
              disabled={isLoading || !formData.name || !formData.brand || !formData.theme || !formData.startDate}
              className="submit-button"
          >
            {isLoading ? '저장 중...' : '저장'}
          </BasicButton>
        </div>
      </div>
  );
};

export default ExhibitionRegist;
