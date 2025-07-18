import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BasicButton from '../../../common/button/BasicButton';
import { exhibitionService } from '../../../services/exhibitionService';
import '../../../styless/exhibitiondetail/ExhibitionDetailRegist.css';

const ExhibitionDetailRegist = () => {
  const { exhibitionId } = useParams();

  const [exhibitionInfo, setExhibitionInfo] = useState({
    exhibitionId: '',
    exhibitionName: ''
  });

  const [patternForm, setPatternForm] = useState({
    patternType: '',
    isActive: true
  });

  const [patterns, setPatterns] = useState([]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);

  const patternTypes = [
    { value: 'img1', label: '2단이미지' },
    { value: 'img2', label: '4단이미지' },
    { value: 'text', label: '텍스트' },
    { value: 'video', label: '동영상' }
  ];

  useEffect(() => {
    const fetchExhibitionInfo = async () => {
      try {
        const response = await exhibitionService.getExhibitionById(exhibitionId);

        if (response.success && response.data) {
          setExhibitionInfo({
            exhibitionId: exhibitionId,
            exhibitionName: response.data.exhibitionName
          });
        } else {
          console.error('기획전 정보 조회 실패:', response.message);
          alert('기획전 정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('기획전 정보 조회 실패:', error);
        alert('기획전 정보를 불러오는데 실패했습니다.');
      }
    };

    if (exhibitionId) {
      fetchExhibitionInfo();
    }
  }, [exhibitionId]);

  const handlePatternFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPatternForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddPattern = () => {
    if (!patternForm.patternType) {
      alert('패턴타입을 선택해주세요.');
      return;
    }

    const nextSort = patterns.length + 1;

    const newPattern = {
      id: Date.now(),
      exhibitionId: parseInt(exhibitionId),
      patternType: patternForm.patternType,
      patternSort: nextSort,
      isActive: patternForm.isActive
    };

    setPatterns(prev => [...prev, newPattern]);
    setPatternForm({
      patternType: '',
      isActive: true
    });
  };

  const handlePatternCheck = (patternId) => {
    setSelectedPatterns(prev =>
        prev.includes(patternId)
            ? prev.filter(id => id !== patternId)
            : [...prev, patternId]
    );
  };

  const handleDeletePatterns = () => {
    if (selectedPatterns.length === 0) {
      alert('삭제할 패턴을 선택해주세요.');
      return;
    }

    const remainingPatterns = patterns.filter(pattern => !selectedPatterns.includes(pattern.id));

    const reorderedPatterns = remainingPatterns.map((pattern, index) => ({
      ...pattern,
      patternSort: index + 1
    }));

    setPatterns(reorderedPatterns);
    setSelectedPatterns([]);
  };

  const getPatternTypeLabel = (type) => {
    const patternType = patternTypes.find(pt => pt.value === type);
    return patternType ? patternType.label : type;
  };

  return (
      <div className="exhibition-pattern-regist">
        <div className="exhibition-pattern-regist-title">
          패턴 등록
        </div>

        <div className="exhibition-pattern-regist-container">
          {/* 패턴 추가 섹션 */}
          <div className="pattern-section">
            <div className="section-header">
              <h3>추가</h3>
            </div>

            <div className="pattern-form">
              <div className="pattern-form-row">
                <label>기획전명</label>
                <input
                    type="text"
                    value={exhibitionInfo.exhibitionName}
                    readOnly
                    className="readonly-input"
                />
              </div>

              <div className="pattern-form-row">
                <label>패턴타입</label>
                <select
                    name="patternType"
                    value={patternForm.patternType}
                    onChange={handlePatternFormChange}
                >
                  <option value="">선택하세요</option>
                  {patternTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                  ))}
                </select>
              </div>

              <div className="pattern-form-row">
                <label>패턴 순서</label>
                <input
                    type="text"
                    value={patterns.length + 1}
                    readOnly
                    className="readonly-input"
                />
              </div>

              <div className="pattern-form-row">
                <label>패턴 전시여부</label>
                <input
                    type="checkbox"
                    name="isActive"
                    checked={patternForm.isActive}
                    onChange={handlePatternFormChange}
                />
              </div>
            </div>

            <div className="pattern-actions">
              <BasicButton size="medium" onClick={handleAddPattern}>
                추가
              </BasicButton>
            </div>
          </div>

          {/* 패턴 목록 섹션 */}
          <div className="pattern-section">
            <div className="section-header">
              <h3>목록</h3>
              <BasicButton
                  size="small"
                  onClick={handleDeletePatterns}
                  className="delete-button"
              >
                삭제
              </BasicButton>
            </div>

            <div className="pattern-list">
              <div className="pattern-list-header">
                <div className="col-checkbox"></div>
                <div className="col-name">기획전명</div>
                <div className="col-type">패턴타입</div>
                <div className="col-sort">패턴순서</div>
                <div className="col-status">패턴전시여부</div>
              </div>

              {patterns.map(pattern => (
                  <div key={pattern.id} className="pattern-list-item">
                    <div className="col-checkbox">
                      <input
                          type="checkbox"
                          checked={selectedPatterns.includes(pattern.id)}
                          onChange={() => handlePatternCheck(pattern.id)}
                      />
                    </div>
                    <div className="col-name">{exhibitionInfo.exhibitionName}</div>
                    <div className="col-type">{getPatternTypeLabel(pattern.patternType)}</div>
                    <div className="col-sort">{pattern.patternSort}</div>
                    <div className="col-status">
                  <span className={`status ${pattern.isActive ? 'active' : 'inactive'}`}>
                    {pattern.isActive ? '전시' : '비전시'}
                  </span>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ExhibitionDetailRegist;
