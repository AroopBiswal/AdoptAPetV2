import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";

//page,component, and scripot imports
import NavBar from "./components/navBar/navBar";
import HomePage from "./pages/homePage/homePage";
import SearchPage from "./pages/searchPage/searchPage";
import { getBearerToken, search } from "./scripts/apiCalls";

function App() {
  const [count, setCount] = useState(0);
  const [bearerSet, setBearerSet] = useState(false);
  const [bearerToken, setBearerToken] = useState("");

  const fetchBearerToken = async () => {
    const bearer = await getBearerToken();
    console.log(bearer);
    setBearerToken(bearer);
    localStorage.setItem("BearerToken", bearer);
    console.log("Bearer token set in local storage");
    // console.log("Bearer token fetched");
    // console.log(bearer);
  };

  useEffect(() => {
    if (!bearerSet) {
      fetchBearerToken();

      console.log(localStorage.getItem("BearerToken"));
      setBearerSet(true);
    }
  });

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/search"
            element={<SearchPage BearerToken={bearerToken} />}
          />

          <Route path="/saved" element={<SearchPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
