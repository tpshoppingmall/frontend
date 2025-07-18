import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_API || 'http://localhost:8081';

export const exhibitionService = {
  /*기획전 등록*/
  createExhibition: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/regist/exhibition`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      return response.data;
    } catch (error) {
      console.error('기획전 등록 실패:', error);
      throw error;
    }
  },

  /*기획전 목록 조회*/
  getExhibitions: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/list/exhibition`);
      return response.data;
    } catch (error) {
      console.error('기획전 목록 조회 실패:', error);
      throw error;
    }
  },

  /*기획전 상세 조회*/
  getExhibitionById: async (exhibitionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/list/detailExhibition?exhibitionId=${exhibitionId}`);
      return response.data;
    } catch (error) {
      console.error('기획전 상세 조회 실패:', error);
      throw error;
    }
  }

};
