import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from "./common/layout/MainLayout";
import "./styless/layout/MainLayaout.css";

import Home from "./views/home/Home";
import ExhibitionListAdminPage from "./pages/ExhibitionListAdminPage";
import ExhibitionList from "./views/exhibition/ExhibitionList";
import ExhibitionRegistPage from "./pages/ExhibitionRegistPage";
import ExhibitionDetailPage from "./pages/ExhibitionDetailPage";



const App = () => {
  return (
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exhibition" element={<ExhibitionList />} />
            <Route path="/exhibition/admin" element={<ExhibitionListAdminPage />} />
            <Route path="/exhibition/regist" element={<ExhibitionRegistPage />} />
            <Route path="/exhibition/detail" element={<ExhibitionDetailPage />} />
          </Routes>
        </MainLayout>
      </Router>
  );
};

export default App;
