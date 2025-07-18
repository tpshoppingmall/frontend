import "../../../styless/exhibitiondetail/ExhibitionDetailAdmin.css"
import BasicButton from "../../../common/button/BasicButton";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React from "react";

const ExhibitionDetailAdmin = () => {
  const navigate = useNavigate();
  const { exhibitionId} = useParams();

  const handlePatternClick = () => {
    navigate(`/exhibition/admin/detail/${exhibitionId}/register`)
  }

  return(
      <div className="exhibition-pattern">
        <div className="exhibition-pattern-actions">
          <BasicButton
              size="medium"
              onClick={handlePatternClick}
          >
            패턴 등록
          </BasicButton>
        </div>
      </div>
  );
};

export default ExhibitionDetailAdmin;
