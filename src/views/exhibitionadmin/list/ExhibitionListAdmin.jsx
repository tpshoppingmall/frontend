import React, { useState, useEffect } from 'react';
import "../../../styless/exhibition/ExhibitionAdmin.css";
import ExhibitionSelect from "./ExhibitionSelect";
import BasicButton from "../../../common/button/BasicButton";
import { useNavigate } from "react-router-dom";
import { exhibitionService } from "../../../services/exhibitionService";

const ExhibitionListAdmin = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [exhibitions, setExhibitions] = useState([]);
  const [filteredExhibitions, setFilteredExhibitions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadExhibitions();
  }, []);

  useEffect(() => {
    filterExhibitions();
  }, [exhibitions, selectedBrand, selectedTheme]);

  const loadExhibitions = async () => {
    setIsLoading(true);
    try {
      const response = await exhibitionService.getExhibitions();

      if (response.success) {
        setExhibitions(response.data || []);
      } else {
        console.error('기획전 목록 조회 실패:', response.message);
        alert('기획전 목록을 불러오는데 실패했습니다.');
        setExhibitions([]);
      }
    } catch (error) {
      console.error('기획전 목록 조회 에러:', error);
      alert('기획전 목록을 불러오는데 실패했습니다.');
      setExhibitions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterExhibitions = () => {
    let filtered = exhibitions;

    if (selectedBrand && selectedBrand !== '모든 브랜드') {
      filtered = filtered.filter(exhibition =>
          exhibition.exhibitionBrand === selectedBrand
      );
    }

    if (selectedTheme && selectedTheme !== '모든 테마') {
      filtered = filtered.filter(exhibition =>
          exhibition.exhibitionTime === selectedTheme
      );
    }

    setFilteredExhibitions(filtered);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  const handleRegistClick = () => {
    navigate("/exhibition/admin/regist");
  };

  const handleExhibitionClick = (exhibitionId) => {
    navigate(`/exhibition/admin/detail/${exhibitionId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  if (isLoading) {
    return (
        <div className="exhibition-loading">
          <p>기획전 목록을 불러오는 중...</p>
        </div>
    );
  }

  return (
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

        {/* 기획전 리스트 */}
        <div className="exhibition-list-container">
          {filteredExhibitions.length === 0 ? (
              <div className="no-exhibitions">
                <p>등록된 기획전이 없습니다.</p>
              </div>
          ) : (
              <div className="exhibition-grid">
                {filteredExhibitions.map((exhibition) => (
                    <div
                        key={exhibition.exhibitionId}
                        className="exhibition-card"
                        onClick={() => handleExhibitionClick(exhibition.exhibitionId)}
                    >
                      <div className="exhibition-image-container">
                        {exhibition.exhibitionImage ? (
                            <img
                                src={exhibition.exhibitionImage}
                                alt={exhibition.exhibitionName}
                                className="exhibition-image"
                            />
                        ) : (
                            <div className="exhibition-no-image">
                              이미지 없음
                            </div>
                        )}
                        {!exhibition.active && (
                            <div className="exhibition-inactive-overlay">
                              비노출
                            </div>
                        )}
                      </div>

                      <div className="exhibition-info">
                        <div className="exhibition-name">{exhibition.exhibitionName}</div>
                        <div className="exhibition-brand">{exhibition.exhibitionBrand}<span
                            className="exhibition-theme">{exhibition.exhibitionTheme}</span></div>
                        <div className="exhibition-details">
                          {exhibition.saleStatus && (
                              <span className="exhibition-sale">{exhibition.saleStatus}% 할인</span>
                          )}
                        </div>
                        <div className="exhibition-period">
                          {formatDate(exhibition.exhibitionPeriod)}
                        </div>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
};

export default ExhibitionListAdmin;
