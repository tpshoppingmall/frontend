import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from "./common/layout/MainLayout";
import "./styless/layout/MainLayaout.css";

import Home from "./views/home/Home";
import ExhibitionListAdminPage from "./pages/ExhibitionListAdminPage";
import ExhibitionList from "./views/exhibition/ExhibitionList";
import ExhibitionRegistPage from "./pages/ExhibitionRegistPage";
import ExhibitionDetailAdminPage from "./pages/ExhibitionDetailAdminPage";
import ExhibitionDetailRegistPage from "./pages/ExhibitionDetailRegistPage";



const App = () => {
  return (
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exhibition" element={<ExhibitionList />} />

            {/*관리자 페이지*/}
            <Route path="/exhibition/admin" element={<ExhibitionListAdminPage />} />
            <Route path="/exhibition/admin/regist" element={<ExhibitionRegistPage />} />
            <Route path="/exhibition/admin/detail/:exhibitionId" element={<ExhibitionDetailAdminPage />} />
            <Route path="/exhibition/admin/detail/:exhibitionId/register" element={<ExhibitionDetailRegistPage />} />




          </Routes>
        </MainLayout>
      </Router>
  );
};

export default App;
