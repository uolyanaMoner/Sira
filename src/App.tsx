import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SynaxariumPage from "./components/SynaxariumPage";
import SaintsPage from "./pages/SaintsPage";
import SaintPage from "./pages/SaintPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotesPage from "./pages/NotesPage";
import DayPage from "./pages/DayPage";
import SpiritualGuide from "./pages/SpiritualGuide";
import HighlightsPage from "./pages/Highlight";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Home />} />

        {/* صفحة السنكسار الكامل */}
        <Route path="/synaxarium" element={<SynaxariumPage />} />
        <Route path="/saints" element={<SaintsPage />} />
        <Route path="/saint/:slug" element={<SaintPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/day/:date" element={<DayPage />} />   
        <Route path="/spiritual-guide" element={<SpiritualGuide />} />   
        <Route path="/highlight" element={<HighlightsPage />} />          
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;