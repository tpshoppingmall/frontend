import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from "./common/layout/MainLayout";
import "./styless/layout/MainLayaout.css";

import ExhibitionListAdminPage from "./pages/ExhibitionListAdminPage";
import ExhibitionRegistPage from "./pages/ExhibitionRegistPage";

const App = () => {
  return (
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/admin" element={<ExhibitionListAdminPage />} />
            <Route path="/exhibition/regist" element={<ExhibitionRegistPage />} />
          </Routes>
        </MainLayout>
      </Router>
  );
};

export default App;
