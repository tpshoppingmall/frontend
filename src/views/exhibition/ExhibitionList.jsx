import React, { useState, useEffect } from 'react';
import "../../styless/exhibition/ExhibitionList.css";
import ExhibitionSelect from "../exhibitionadmin/list/ExhibitionSelect";
import { exhibitionService } from "../../services/exhibitionService";
import { useNavigate } from "react-router-dom";

const ExhibitionList = () => {
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
        const activeExhibitions = response.data.filter(exhibition => exhibition.active);
        setExhibitions(activeExhibitions || []);
      } else {
        console.error('기획전 목록 조회 실패:', response.message);
        setExhibitions([]);
      }
    } catch (error) {
      console.error('기획전 목록 조회 에러:', error);
      setExhibitions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterExhibitions = () => {
    let filtered = exhibitions;

    /* 브랜드 필터링 */
    if (selectedBrand && selectedBrand !== '모든 브랜드') {
      filtered = filtered.filter(exhibition =>
          exhibition.exhibitionBrand === selectedBrand
      );
    }

    /* 테마 필터링 */
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

  const handleExhibitionClick = (exhibitionId) => {
    navigate(`/exhibition/detail/${exhibitionId}`);
  };

  if (isLoading) {
    return (
        <div className="user-exhibition-loading">
          <p>기획전을 불러오는 중...</p>
        </div>
    );
  }

  return (
      <div>
        <div className="exhibition-title">
          기획전
        </div>

        <div className="user-exhibition-container">
          <ExhibitionSelect
              selectedBrand={selectedBrand}
              selectedTheme={selectedTheme}
              onBrandChange={handleBrandChange}
              onThemeChange={handleThemeChange}
          />

          {/* 기획전 리스트 */}
          <div className="user-exhibition-list">
            {filteredExhibitions.length === 0 ? (
                <div className="user-no-exhibitions">
                  <p>진행중인 기획전이 없습니다.</p>
                </div>
            ) : (
                <div className="user-exhibition-grid">
                  {filteredExhibitions.map((exhibition) => (
                      <div
                          key={exhibition.exhibitionId}
                          className="user-exhibition-item"
                          onClick={() => handleExhibitionClick(exhibition.exhibitionId)}
                      >
                        <div className="user-exhibition-image-wrapper">
                          {exhibition.exhibitionImage ? (
                              <img
                                  src={exhibition.exhibitionImage}
                                  alt={exhibition.exhibitionName}
                                  className="user-exhibition-image"
                              />
                          ) : (
                              <div className="user-exhibition-placeholder">
                                이미지 준비중
                              </div>
                          )}
                        </div>

                        <div className="user-exhibition-content">
                          <div className="user-exhibition-brand">{exhibition.exhibitionBrand}</div>
                          <div className="user-exhibition-title">{exhibition.exhibitionName}</div>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>

  );
};

export default ExhibitionList;
