import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
import Catalogue from './components/Catalogue/Catalogue';
import Navigation from './components/Navigation/Navigation';
import Search from "./components/Search/Search";

function App() {
  const location = useLocation();
  const currentPage = location.pathname;
  return (
    <>
      {currentPage !== '/' && <Navigation />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path='/search' element={<Search />} />
        <Route path='/categorize' element={<Search />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
