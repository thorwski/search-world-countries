import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryDetails from "./pages/CountryDetails";
import Home from "./pages/Home";
import ThemeProvider from "./context/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:countryCode" element={<CountryDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
