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
    console.log("Fetching bearer token")
    const bearer = await getBearerToken();
    console.log(bearer);
    setBearerToken(bearer);
    localStorage.setItem("BearerToken", bearer);
    console.log("Bearer token set in local storage");
    console.log("Bearer token fetched");
    console.log(bearer);
  };

  useEffect(() => {
    console.log("API Key --> " + import.meta.env.VITE_API_KEY);
    if (!bearerSet) {
      fetchBearerToken();

      console.log("BEARER" + localStorage.getItem("BearerToken"));
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
