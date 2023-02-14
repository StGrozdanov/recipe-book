import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
import Catalogue from './components/Catalogue/Catalogue';
import Navigation from './components/Navigation/Navigation';
import Search from "./components/Search/Search";
import Categorization from "./components/Categorization/Categorization";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import ForgottenPassword from "./components/ForgottenPassword/ForgottenPassword";
import { AuthProvider } from "./contexts/AuthContext";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";

function App() {
  const location = useLocation();
  const currentPage = location.pathname;
  return (
    <AuthProvider>
      {currentPage !== '/' && <Navigation />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/catalogue' element={<Catalogue />} />
        <Route path='/search' element={<Search />} />
        <Route path='/categories' element={<Categorization />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotten-password' element={<ForgottenPassword />} />
        <Route path='/details/:id' element={<RecipeDetails />} />
        <Route path='/details/:id/comments' element={<RecipeDetails />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
